import { utilContent } from '../templates/app/util-content';
import { appActionCreatorContent } from '../templates/app/action-creator-content';
import { appStoreServiceContent } from '../templates/app/app-store-service-content';
import { appStateContent } from '../templates/app/app-state-content';
import { appStoreModuleContent } from '../templates/app/app-store-module-content';

export class AppStoreFileContents {
  public util_ts(): string {
    return utilContent();
  }

  public app_store_module_ts(): string {
    return appStoreModuleContent();
  }

  public action_creator_ts(): string {
    return appActionCreatorContent();
  }

  public app_state_ts(): string {
    return appStateContent();
  }

  public app_store_service_ts(): string {
    return appStoreServiceContent();
  }
}
