# 基于 single-spa 的微前端demo实践

## 基本概念
### 基座应用
相当于容器，其本身不应处理具体业务，而关注于具体的加载子应用的逻辑完善和子应用状态管理。

### 子应用
具体被使用的应用，我认为它们都应该是独立完整的服务，即可独立开发与维护

### parcel
parcel 这个概念是 single-spa 的概念，可以认为它是一个可被开发者完全控制其状态机流转的一个组件，它区别与应用的地方是不能独立开发、维护、使用，它们均应被 应用 所使用

### 状态
指的是 子应用 和 parcel 的状态机，或者说是生命周期。

应用的生命周期有：load unload mount unmount 以及bootstrap

parcel的生命周期有：mount unmount update 以及 bootstrap

## 运行原理
从状态的角度来看的话，single-spa做的事情只是流转子应用的状态机，并不做任何业务处理，所以基座应用中应当处理 如何加载/卸载子应用。

如果整合的是spa，那么只需要在注册应用时明确在load阶段将webpack（或者其他打包工具，或者无打包）最终生成的入口js文件通过script标签的形式引入进来,
unmount周期卸载应用即可。

而且由于spa基于路由解耦业务，其实只需要关注load周期即可。例如：

http://example.com/react-app load react子应用 reactApp

http://example.com/vue-app load vue子应用 vueApp

那么我们如果在reactApp中设置路由 base=/react ,那么匹配到 /vue-app 的时候 reactApp自然不做任何渲染

还有一个重要业务场景：在 vueApp 中复用 reactApp的组件，这时候就需要用到parcel的概念。

具体做法详见代码，简单描述我的实现方式：

1. 基座应用维护parcel的一个map<string, Parcel>
2. 当reactApp.status = load的时候，基座应用传入map，并且自带的props里面会有相关api：mountRootParcel等，其应用内部需要暴露的组件利用mountRootParcel 注册parcel，并设置到map中去
3. 当vueApp.status = load的时候，基座应用传入map，此时在vueApp中比如处理事件，即可拿到 map.get('parcel-app').mount().finally(() => update());

以上知识简单的示例，具体代码可以看代码自行理解，本身single-spa的源码不难理解，其对于应用/parcel的状态的互斥性和具体如何流转可参考其源码实现以此定制自己的微前端架构。

