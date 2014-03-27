#pragma strict

//a public variable that we can set for the player's speed.
var speed:float = 6;

var innerJoy:GUITexture;
var outerJoy:GUITexture;

//a bunch of private variables we use to move the player well.
private var moveDirection:Vector3;
private var normalized:float = 1.0;
private var attacking = false;
private var invEnabled = false;
private var inv:GameObject;
private var canInventory = true;
private var isTalking = false;
private var distBoost:float;
private var touching = false;


var isRemotePlayer = true;
var isRoomOwner:boolean = false;

function Start () {
	//this is to regulate the players speed when using the mobile joystick.
	distBoost = speed/0.05;

}

function SetIsRemotePlayer(val:boolean)
{
	isRemotePlayer = val;
	if( isRemotePlayer == false )
	{
		//we find the inventory box and deactivate it. the controls access inventory so the player can open it up and close it.
		inv = GameObject.Find("GUI/inventory");
		inv.SetActive(false);
	}
}

function SetIsRoomOwner(val:boolean)
{
	isRoomOwner = val;
}


function Update () {

 if (isRemotePlayer) return;
 
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;
/*
//DESKTOP (MAC/PC) CONTROLS
#if UNITY_STANDALONE
//if istalking is false, thats step one for allowing the player to move
if(isTalking == false){
//if inventory is also false, then thats step two for allowing hte player to move
if(invEnabled == false){
//if the player is not attacking, then we're golden and the player can totally move.
if(attacking == false){
//we check to see if the player wants to move left or right
if(Input.GetKey("a") || Input.GetKey("d") || Input.GetKey("left") || Input.GetKey("right")){
//now we check to see which specifically, then apply speed.
if(Input.GetKey("a") || Input.GetKey("left")){
moveDirection.x = -speed;
}
if(Input.GetKey("d") || Input.GetKey("right")){
moveDirection.x = speed;
}
//if he doesn't want to move left or right, we set x velocity to 0
}else{
moveDirection.x = 0;
}

//now we check to see if hte player wants to move up or down
if(Input.GetKey("w") || Input.GetKey("s") || Input.GetKey("up") || Input.GetKey("down")){
//now we check to see which way specifically, and apply speed.
if(Input.GetKey("w") || Input.GetKey("up")){
moveDirection.z = speed;
}
if(Input.GetKey("s") || Input.GetKey("down")){
moveDirection.z = -speed;
}
//otherwise we set our vertical velocity to 0
}else{
moveDirection.z = 0;
}

//if the player is moving in 2 directions at once, then we're pretty sure he wants to move diagonally
if(rigidbody.velocity.x != 0 && rigidbody.velocity.z != 0){
//to move the player diagonally without making him go faster, we reduce the total speed with this fancy number.
normalized = 1/1.4142145;
}else{
//if he doesn't want to move diagonally we set normalized back to 1.
normalized = 1.0;
}
//add the force
// we apply the normalized variable to the speed to slow diagonal speed down
rigidbody.velocity = moveDirection*normalized;
//this else refers to the attacking = false way up at the top of function update
//if attacking is true we stop the player from moving
}else{
rigidbody.velocity = Vector3(0,0,0);
}
}

//if the player presses e and he is able to open inventory, then we check to see if inventory is open already or not
if(Input.GetKeyDown("e") && canInventory == true){
//we check the inventory by calling the function inventoryCheck that you'll find further down in this script.
inventoryCheck();
}
//this else refers to the istalking = false way up at the top of function update
//if the player is talking to an npc we make sure he doesn't move
}else{
rigidbody.velocity = Vector3(0,0,0);
}
#endif
*/
//WEB CONTROLS
#if UNITY_WEBPLAYER
//if istalking is false, thats step one for allowing the player to move
if(isTalking == false){
//if inventory is also false, then thats step two for allowing hte player to move
if(invEnabled == false){
//if the player is not attacking, then we're golden and the player can totally move.
if(attacking == false){
//we check to see if the player wants to move left or right
if(Input.GetKey("a") || Input.GetKey("d") || Input.GetKey("left") || Input.GetKey("right")){
//now we check to see which specifically, then apply speed.
if(Input.GetKey("a") || Input.GetKey("left")){
moveDirection.x = -speed;
}
if(Input.GetKey("d") || Input.GetKey("right")){
moveDirection.x = speed;
}
//if he doesn't want to move left or right, we set x velocity to 0
}else{
moveDirection.x = 0;
}

//now we check to see if hte player wants to move up or down
if(Input.GetKey("w") || Input.GetKey("s") || Input.GetKey("up") || Input.GetKey("down")){
//now we check to see which way specifically, and apply speed.
if(Input.GetKey("w") || Input.GetKey("up")){
moveDirection.z = speed;
}
if(Input.GetKey("s") || Input.GetKey("down")){
moveDirection.z = -speed;
}
//otherwise we set our vertical velocity to 0
}else{
moveDirection.z = 0;
}

//if the player is moving in 2 directions at once, then we're pretty sure he wants to move diagonally
if(rigidbody.velocity.x != 0 && rigidbody.velocity.z != 0){
//to move the player diagonally without making him go faster, we reduce the total speed with this fancy number.
normalized = 1/1.4142145;
}else{
//if he doesn't want to move diagonally we set normalized back to 1.
normalized = 1.0;
}
//add the force
// we apply the normalized variable to the speed to slow diagonal speed down
rigidbody.velocity = moveDirection*normalized;
//this else refers to the attacking = false way up at the top of function update
//if attacking is true we stop the player from moving
}else{
rigidbody.velocity = Vector3(0,0,0);
}
}

//if the player presses e and he is able to open inventory, then we check to see if inventory is open already or not
if(Input.GetKeyDown("e") && canInventory == true){
//we check the inventory by calling the function inventoryCheck that you'll find further down in this script.
inventoryCheck();
}
//this else refers to the istalking = false way up at the top of function update
//if the player is talking to an npc we make sure he doesn't move
}else{
rigidbody.velocity = Vector3(0,0,0);
}
#endif

//IOS CONTROLS
#if UNITY_IOS
//if istalking is false, thats step one for allowing the player to move
if(isTalking == false){
//if inventory is also false, then thats step two for allowing hte player to move
if(invEnabled == false){
//if the player is not attacking, then we're golden and the player can totally move.
if(attacking == false){

if(Input.touchCount <= 1){
	innerJoy.transform.position = outerJoy.transform.position;
}

//MOVEMENT CONTROLS FOR MOBILE
if(Input.touchCount >= 1){
	for(var touch1 : Touch in Input.touches) { 
		if(touch1.position.x < Screen.width/2 && touch1.position.y < Screen.height/3*2){
			innerJoy.transform.position = camera.main.ScreenToViewportPoint(touch1.position)+Vector3(0,0,0.1);
			var moveDir = new Vector3(outerJoy.transform.position.x - innerJoy.transform.position.x, 0,outerJoy.transform.position.y - innerJoy.transform.position.y);
			moveDir.Normalize();
			var dist = Vector3.Distance(outerJoy.transform.position, innerJoy.transform.position) - 0.1;
			if(distBoost*dist < speed){
				rigidbody.velocity = -moveDir*(distBoost*dist);
			}else{
				rigidbody.velocity = -moveDir*(speed);
			}
		}else{
			if(Input.touchCount <= 1){
				rigidbody.velocity = Vector3(0,0,0);
			}
		}
	}
}else{
	rigidbody.velocity = Vector3(0,0,0);
}

}else{
	rigidbody.velocity = Vector3(0,0,0);
}
}

//OPEN INVENTORY
if(Input.touchCount >= 1){
	for(var touch1 : Touch in Input.touches) { 
		if(touch1.position.x < Screen.width/6 && touch1.position.y > Screen.height/6*5 && canInventory == true && touching == false){
			touching = true;
			inventoryCheck();
		}
	}
}else{
	touching = false;
}

//this else refers to the istalking = false way up at the top of function update
//if the player is talking to an npc we make sure he doesn't move
}else{
rigidbody.velocity = Vector3(0,0,0);
}
#endif

//ANDROID CONTROLS
#if UNITY_ANDROID
	//if istalking is false, thats step one for allowing the player to move
	if(isTalking == false)
	{
		//if inventory is also false, then thats step two for allowing hte player to move
		if(invEnabled == false)
		{
			//if the player is not attacking, then we're golden and the player can totally move.
			if(attacking == false)
			{

				if(Input.touchCount <= 1)
				{
					innerJoy.transform.position = outerJoy.transform.position;
				}

				//MOVEMENT CONTROLS FOR MOBILE
				if(Input.touchCount >= 1)
				{
					for(var touch1 : Touch in Input.touches) { 
						if(touch1.position.x < Screen.width/2 && touch1.position.y < Screen.height/3*2){
							innerJoy.transform.position = camera.main.ScreenToViewportPoint(touch1.position)+Vector3(0,0,0.1);
							var moveDir = new Vector3(outerJoy.transform.position.x - innerJoy.transform.position.x, 0,outerJoy.transform.position.y - innerJoy.transform.position.y);
							moveDir.Normalize();
							var dist = Vector3.Distance(outerJoy.transform.position, innerJoy.transform.position) - 0.1;
							if(distBoost*dist < speed){
								rigidbody.velocity = -moveDir*(distBoost*dist);
							}else{
								rigidbody.velocity = -moveDir*(speed);
							}
						}else{
							if(Input.touchCount <= 1){
								rigidbody.velocity = Vector3(0,0,0);
							}
						}
					}
				}
				else
				{
					rigidbody.velocity = Vector3(0,0,0);
				}

			}
			else
			{
				rigidbody.velocity = Vector3(0,0,0);
			}
		}

		//OPEN INVENTORY
		if(Input.touchCount >= 1){
			for(var touch1 : Touch in Input.touches) { 
				if(touch1.position.x < Screen.width/6 && touch1.position.y > Screen.height/6*5 && canInventory == true && touching == false){
					touching = true;
					inventoryCheck();
				}
			}
		}else{
			touching = false;
		}

	//this else refers to the istalking = false way up at the top of function update
	//if the player is talking to an npc we make sure he doesn't move
	}
	else
	{
		rigidbody.velocity = Vector3(0,0,0);
	}
#endif

//end of function update
}

//we get this message to call this function from playerweapons. we set attacking to true for 0.25 seconds then turn it off again. during that time the player can't move.
function strike () {
	attacking = true;
	yield WaitForSeconds(0.25);
	attacking = false;
}

//we check the inventory to see if we're opening it or turning it off.
function inventoryCheck () {
	if(inv.activeInHierarchy == false)
	{
		inv.SetActive(true);
		invEnabled = true;
		rigidbody.velocity = Vector3(0,0,0);
	}
	else
	{
		inv.SetActive(false);
		invEnabled = false;
	}
}

//if we're in a trigger collider that is tagged as npc, we don't allow the player to open the inventory because they use the same button.
function OnTriggerEnter (other : Collider){

}
//if the player exits a trigger area, we turn the ability to open inventory back on
function OnTriggerExit (other : Collider){
	canInventory = true;
}

//this function is called when the player buys something, to make sure that the player can access the inventory again.
function inventoryFix () {
	yield WaitForSeconds(0.25);
	canInventory = true;
}

//we call this function to check if we're either entering a conversation or exiting, then make istalking either true or false.
function talking (state : float){
	if(state == 1){
		isTalking = true;
	}
	if(state == 0){
		isTalking = false;
	}
}






