import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../components/app.module';
import { AppComponent } from '../components/app.component';
export default class YourWebPart extends BaseClientSideWebPart {
    render() {
        this.domElement.innerHTML = '<app-root></app-root>';
        platformBrowserDynamic()
            .bootstrapModule(AppModule)
            .then((moduleRef) => {
            const appRef = moduleRef.injector.get(AppComponent);
            // Pass properties to Angular component
            if (this.componentRef) {
                this.componentRef.instance.title = this.properties.title;
                this.componentRef.instance.description = this.properties.description;
            }
        })
            .catch(err => console.error('Error starting Angular app:', err));
    }
    onDispose() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
    get dataVersion() {
        return Version.parse('1.0');
    }
    getPropertyPaneConfiguration() {
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
