using UnityEngine;
using System.Collections;


public class playerControllerCS : MonoBehaviour {

	private Vector3 targetPos;
	private Vector3 screenPos;
	private GameObject  code;
	private RandomMatchmaker camComp;

	// Use this for initialization
	void Start () {
		code = GameObject.Find("Code");
		camComp = code.GetComponent<RandomMatchmaker>();
		targetPos = transform.position;
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 dir;
		float len;
#if UNITY_STANDALONE
		if(Input.GetMouseButtonDown(0))
		{
			screenPos.x = Input.mousePosition.x;
			screenPos.y = Input.mousePosition.y;
			screenPos.z = camComp.myCame.nearClipPlane;
			targetPos = camComp.myCame.ScreenToWorldPoint(screenPos);

		}
#endif
#if UNITY_ANDROID
#endif
		targetPos.y = transform.position.y;
		len = (transform.position - targetPos).magnitude;
		if (len > 0.5)
		{
			dir = targetPos - transform.position;
			dir = dir.normalized;
			rigidbody.velocity = dir * 6;  
		}
		else
			rigidbody.velocity = Vector3.zero;

		//rigidbody.AddForce (dir*800*Time.deltaTime);
	}
}
