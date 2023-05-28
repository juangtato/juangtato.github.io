import { InjectionToken } from "@angular/core";
import { PantryConfig } from "../storage/pantry/pantry.config";
import { SideNavConfig } from "../ui/layout/config/side-nav.config.api";

export const CONFIG_DATA = new InjectionToken<Partial<ConfigData>>('config.data');

export interface ConfigData {
  layout: {
    sidenav: SideNavConfig
  }
  storage: {
    pantry: PantryConfig,
  }
}

export const DEFAULT_CONFIG: ConfigData = {
  layout: {
    sidenav: {
      items: [
        {
          type: 'link',
          link: "about",
          label: "About",
          icon: "dashboard"
        },
        {
          type: 'link',
          link: "/example",
          label: "Examples",
          icon: "account_balance"
        },
        {
          type: 'title',
          label: 'Settings'
        },
        {
          type: 'link',
          label: 'Configuration',
          link: '/config',
          icon: 'settings'
        }
      ]
    }
  },
  storage: {
    pantry: {
      pantryId: '...',
      url: 'https://getpantry.cloud/apiv1/pantry/'
    }
  }
}
