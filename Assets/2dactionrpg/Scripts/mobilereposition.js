#pragma strict

//this script was added to 1.0.1 for mobile control GUI position changes so the GUI would be better laid out for touchscreens

//we just need to get x and y to change the position of any gui object that the script is attached to
var xPosition:float = 0.0;
var yPosition:float = 0.0;

//we do this on start because we only need it to happen once.
function Start () {
//we only change the ui if the game is running on a mobile device, then we apply to position from the variables -
//that are accessed in the inspector.
#if UNITY_IOS
transform.position.x = xPosition;
transform.position.y = yPosition;
#endif

#if UNITY_ANDROID
transform.position.x = xPosition;
transform.position.y = yPosition;
#endif
}