import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// eslint-disable-next-line import/no-anonymous-default-export
export default function(SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response =>{
                console.log(response)
                //로그인 하지 않은 상태

                if(!response.payload.isAuth) {
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option===false){
                            props.history.push('/')
                        }
                    }


                }





            })


        }, [])
        return (
        <SpecificComponent/>)
    }
    return AuthenticationCheck
}