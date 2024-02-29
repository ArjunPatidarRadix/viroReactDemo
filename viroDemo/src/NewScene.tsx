import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
} from "@viro-community/react-viro";
import { ViroTrackingReason } from "@viro-community/react-viro/dist/components/Types/ViroEvents";

export const NewScene = () => {
  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }
  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={"Hello"}
        scale={[0.2, 0.2, 0.2]}
        position={[0, 0.3, -1]}
      />
    </ViroARScene>
  );
};
