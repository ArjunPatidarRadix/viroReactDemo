/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleCpp.js
 */

#include "rnreanimatedJSI.h"

namespace facebook::react {

static jsi::Value __hostFunction_NativeReanimatedModuleCxxSpecJSI_installTurboModule(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<NativeReanimatedModuleCxxSpecJSI *>(&turboModule)->installTurboModule(
    rt,
    args[0].asString(rt)
  );
}

NativeReanimatedModuleCxxSpecJSI::NativeReanimatedModuleCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker)
  : TurboModule("ReanimatedModule", jsInvoker) {
  methodMap_["installTurboModule"] = MethodMetadata {1, __hostFunction_NativeReanimatedModuleCxxSpecJSI_installTurboModule};
}


} // namespace facebook::react
