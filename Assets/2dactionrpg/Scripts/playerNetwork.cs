using UnityEngine;
using System.Collections;

public class playerNetwork : Photon.MonoBehaviour
{
	private playercontrols controllerScript;
	private PhotonView myPhotonView;
	void Awake()
	{
		controllerScript = GetComponent<playercontrols>();
		myPhotonView = GetComponent<PhotonView>();
	}
 
	void Start()
	{
		GameObject cam;
		camerafollow camComp;
		if (photonView.isMine)
		{
			controllerScript.enabled = true;
			cam = GameObject.Find("Main Camera");
			camComp = cam.GetComponent<camerafollow>();
			camComp.target = transform.gameObject;
		}
		else
			controllerScript.enabled = false;
		controllerScript.SetIsRemotePlayer(!photonView.isMine);
		controllerScript.SetIsRoomOwner(PhotonNetwork.isMasterClient);
		//Debug.Log (photonView.isMine);
	}

	private Vector3 correctPlayerPos = Vector3.zero; //We lerp towards this
	//private Quaternion correctPlayerRot = Quaternion.identity; //We lerp towards this

	void Update()
	{
		if (!photonView.isMine)
		{
			//Update remote player (smooth this, this looks good, at the cost of some accuracy)
			transform.position = Vector3.Lerp(transform.position, correctPlayerPos, Time.deltaTime * 5);
			//transform.rotation = Quaternion.Lerp(transform.rotation, correctPlayerRot, Time.deltaTime * 5);
		}
		else
		{
			if(Input.GetKeyDown("space"))
			{
				myPhotonView.RPC("notifyAttack", PhotonTargets.All);
			}
		}
	}

	void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
	{
		if (stream.isWriting)
		{
			//We own this player: send the others our data
			// stream.SendNext((int)controllerScript._characterState);
			stream.SendNext(transform.position);
			//stream.SendNext(transform.rotation);
			stream.SendNext(rigidbody.velocity); 
			
		}
		else
		{
			//Network player, receive data
			//controllerScript._characterState = (CharacterState)(int)stream.ReceiveNext();
			correctPlayerPos = (Vector3)stream.ReceiveNext();

			//correctPlayerRot = (Quaternion)stream.ReceiveNext();
			rigidbody.velocity = (Vector3)stream.ReceiveNext();
		}
	}
}
