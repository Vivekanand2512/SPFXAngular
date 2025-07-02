import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import 'zone.js';
import '@angular/compiler'; // Required for JIT
import { ApplicationRef, ComponentRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../components/app.component';

export interface IAngularSetupWebPartProps {
  title: string;
  description: string;
}

export default class AngularSetupWebPart extends BaseClientSideWebPart<IAngularSetupWebPartProps> {
  private componentRef: ComponentRef<AppComponent>;

  public render(): void {
    console.log('Instance ID:', this.context.instanceId);
    console.log('Is domElement attached?', document.body.contains(this.domElement));

    // Clear existing content
    this.domElement.innerHTML = '';

    // Create container
    const containerId = this.context.instanceId ? `angular-app-${this.context.instanceId}` : 'angular-app-fallback';
    const appContainer = document.createElement('div');
    appContainer.id = containerId;
    appContainer.innerHTML = '<app-root></app-root>';
    this.domElement.appendChild(appContainer);

    // Verify container
    const appRoot = this.domElement.querySelector(`#${containerId}`);
    if (!appRoot) {
      console.error('Root element for Angular app not found');
      this.domElement.innerHTML = '<div>Error: Application container not found</div>';
      return;
    }

    // Bootstrap Angular standalone component
    bootstrapApplication(AppComponent, {
      providers: []
    })
      .then(appRef => {
        this.componentRef = appRef.components[0];
        this.updateAngularProperties();
        console.log('Angular app started successfully');
      })
      .catch(err => {
        console.error('Error starting Angular app:', err);
        appContainer.innerHTML = `<div>Error loading application: ${err.message}</div>`;
      });
  }

  private updateAngularProperties(): void {
    if (this.componentRef && this.componentRef.instance) {
      this.componentRef.instance.title = this.properties.title || 'Default Title';
      this.componentRef.instance.description = this.properties.description || 'Default Description';
      this.componentRef.injector.get(ApplicationRef).tick();
    }
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    this.updateAngularProperties();
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected onDispose(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.domElement.innerHTML = '';
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'Web Part Settings' },
          groups: [
            {
              groupName: 'Basic Settings',
              groupFields: [
                PropertyPaneTextField('title', { label: 'Title' }),
                PropertyPaneTextField('description', { label: 'Description' })
              ]
            }
          ]
        }
      ]
    };
  }
}