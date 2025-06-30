import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';

// Import Zone.js FIRST
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModuleRef, ComponentRef, ApplicationRef } from '@angular/core';
import { AppModule } from '../components/app.module';
import { AppComponent } from '../components/app.component';

export interface IAngularSetupWebPartProps {
  title: string;
  description: string;
}

export default class AngularSetupWebPart extends BaseClientSideWebPart<IAngularSetupWebPartProps> {
  private moduleRef: NgModuleRef<AppModule>;
  private componentRef: ComponentRef<AppComponent>;

  public render(): void {
    this.domElement.innerHTML = `
      <div id="angular-app-${this.context.instanceId}">
        <app-root></app-root>
      </div>
    `;
    
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .then((moduleRef: NgModuleRef<AppModule>) => {
        this.moduleRef = moduleRef;
        
        // Get the application reference
        const appRef = moduleRef.injector.get(ApplicationRef);
        
        // Get the component reference
        this.componentRef = appRef.components[0] as ComponentRef<AppComponent>;
        
        // Bind properties
        this.updateAngularProperties();
        
        console.log('Angular app started successfully');
      })
      .catch(err => console.error('Error starting Angular app:', err));
  }

  private updateAngularProperties(): void {
    if (this.componentRef && this.componentRef.instance) {
      // Update Angular component properties
      this.componentRef.instance.title = this.properties.title || 'Default Title';
      this.componentRef.instance.description = this.properties.description || 'Default Description';
      
      // Trigger change detection
      this.componentRef.injector.get(ApplicationRef).tick();
    }
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    // Update Angular component when properties change
    this.updateAngularProperties();
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected onDispose(): void {
    if (this.moduleRef) {
      this.moduleRef.destroy();
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Web Part Settings'
          },
          groups: [
            {
              groupName: 'Basic Settings',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title'
                }),
                PropertyPaneTextField('description', {
                  label: 'Description'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}