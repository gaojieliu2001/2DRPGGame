#pragma strict

//this script was added for 1.0.1 for mobile support. It just turns on mobile controls GUI on whatever its attached to, 
//if its running on mobile.

function Start () {
#if UNITY_IOS
guiTexture.enabled = true;
#endif

#if UNITY_ANDROID
guiTexture.enabled = true;
#endif
}