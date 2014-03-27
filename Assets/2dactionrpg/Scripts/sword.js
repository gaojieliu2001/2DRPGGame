#pragma strict

var weaponDamage:float = 1;
//this is attached to the sword that is tagged as a weapon.
private var PC:playercontrols;

function Update () {
	//this is a special line used to set the position of the object so its looks like its over or below things.
	transform.position.y = -transform.position.z/10000+0.5;
}

function OnTriggerEnter (other : Collider) {
    PC = transform.parent.GetComponent("playercontrols");
	//if we hit an enemy we turn off the collider, so that it can't hit anything else or more than once.
	// 攻击者是本地玩家才触发
	if(other.tag == "enemy" && PC.isRemotePlayer == false){
		collider.enabled = false;
		other.BroadcastMessage("takeDamageNet", weaponDamage, SendMessageOptions.DontRequireReceiver);
	}
}