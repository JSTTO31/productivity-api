import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "guest" | "setting-up"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}