import {GrapholioManager} from "../GrapholioManager/GrapholioManager.ts";

export abstract class GCMType {
    protected properties: { [key: string]: unknown } = {};
    protected manager: GrapholioManager; // Replace GrapholioManager with the actual type of your manager reference

    constructor(id:string,manager:GrapholioManager) {
        // Compute some properties and assign them dynamically
        this.properties['id'] = id;
        this.manager = manager
    }

    abstract getProperty(target: any, property: string) : unknown
    abstract setProperty(target: any, property: string, value: any) :boolean

    // Create a proxy to handle dynamic property access
    getProxy() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new Proxy(this, {
            get: (target: any, property: any) => {
                return this.getProperty(target, String(property))
            },
            set: (target, property, value) => this.setProperty(target, String(property), value)


        });
    }
}
