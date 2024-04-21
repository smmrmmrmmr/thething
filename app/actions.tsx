'use server'
 
import { cookies } from 'next/headers'
import userList, { User, Visibles } from 'users/userobject'
import { Hierarchy } from 'hierarchies/hierarchies'
import hierarchyList from 'hierarchies/hierarchies'
// async function createUser(data) {
// //
//   cookies().set({
//     name: 'name',
//     value: 'lee',
//     httpOnly: true,
//     path: '/',
//   })
// }

export async function getUserCookie(){
    const userc =  cookies().get('user');
    if (userc === undefined){
        return null; //TODO: change to error
    };
    const usercookie = userc.value;
    const userobject = userList.find(element => String(element.id) == usercookie);
    if (userobject === undefined){
        return undefined; //TODO: change to error
    }
    else{
        return userobject
    };
};



export async function createUser(data:User) {
    cookies().set({
        name: 'user',
        value: String(data.id),
        httpOnly: true,
        path: '/',
    })
};

export async function createMode(data:Hierarchy) {
    cookies().set({
        name: 'mode',
        value: String(data.id),
        httpOnly: true,
        path: '/'
    })
};

export async function deleteUserCookie() {
    cookies().delete('user')
};

export async function deleteModeCookie() {
    cookies().delete('mode')
};

export async function getVisibles() {
    const modec = cookies().get('mode');
    const userc = cookies().get('user');
    if ((modec === undefined) || (userc === undefined)){
        return null; //TODO: change to error
    }
    else{
        const modecookie = modec.value;
        const modeobject = hierarchyList.find(element => String(element.id) == modecookie);
        const usercookie = userc.value;
        const userobject = userList.find(element => String(element.id) == usercookie);
        if (modeobject !== undefined && userobject !== undefined) {
            var visibles : Visibles = {users: [], devices: [], userids: []}
            // TODO write the conditions to find the lists of users we can see (check supers first)
            if (modeobject.superusers.includes(userobject)){
                visibles.users = visibles.users.concat([userobject],modeobject.users)
            }
            else if (modeobject.supertransparent.includes(userobject)){
                visibles.users = visibles.users.concat(modeobject.transparent,modeobject.supertransparent)
            }
            else if (modeobject.users.includes(userobject)){
                visibles.users = visibles.users.concat([userobject])
            }
            else if(modeobject.transparent.includes(userobject)){
                visibles.users = visibles.users.concat(modeobject.transparent)
            }
            else {
                return undefined
            };
            visibles.users.forEach((user)=> {
                visibles.devices = visibles.devices.concat(user.devices);
                visibles.userids = visibles.userids.concat(user.id);
                
            });
            const setdevices = [...new Set(visibles.devices)]
            visibles.devices = Array.from(setdevices.values())
            return visibles

        }
        else {
            return undefined //TODO: change to error
        };
    };
};



