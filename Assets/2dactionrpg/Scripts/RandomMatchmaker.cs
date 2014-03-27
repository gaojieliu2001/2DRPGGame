using UnityEngine;

public class RandomMatchmaker : Photon.MonoBehaviour
{

	//private PhotonView myPhotonView;
	public Camera myCame;

	// Use this for initialization
	void Start()
	{
		//Debug.Log ("start");
		PhotonNetwork.ConnectUsingSettings("0.1");
	}
	
	void OnJoinedLobby()
	{
		Debug.Log("OnJoinedLobby");
		PhotonNetwork.JoinRoom ("myRoom");
		//PhotonNetwork.JoinRandomRoom();
	}

	void OnPhotonJoinRoomFailed()
	{
		Debug.Log("OnPhotonJoinRoomFailed");
		PhotonNetwork.CreateRoom("myRoom");
	}

	void OnPhotonRandomJoinFailed()
	{
		Debug.Log("OnPhotonRandomJoinFailed");
		PhotonNetwork.CreateRoom(null);
	}
	
	void OnJoinedRoom()
	{
		blobControlerNet controllerScript;
		Debug.Log("OnJoinedRoom");
		PhotonNetwork.Instantiate("Player", Vector3.zero, Quaternion.Euler(270,180,0), 0);
		//GameObject monster = PhotonNetwork.Instantiate("monsterprefab", Vector3.zero, Quaternion.identity, 0);
		//monster.GetComponent<myThirdPersonController>().isControllable = true;
		//myPhotonView = monster.GetComponent<PhotonView>();
		if (PhotonNetwork.isMasterClient)
		{
			// 产生怪物
			GameObject ret = PhotonNetwork.Instantiate ("blobNet", Vector3.zero, Quaternion.Euler (270, 180, 0), 0);
			controllerScript = ret.GetComponent<blobControlerNet>();
			controllerScript.isOwnRoomer = true;
		}
	}

	public void OnPhotonPlayerConnected(PhotonPlayer player)
	{
		Debug.Log("OnPhotonPlayerConnected");
	}
	void OnGUI()
	{

	}
}
