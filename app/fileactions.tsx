'use server'

// import { writeFile } from "fs/promises";s
// import { Buffer } from 'node:buffer';
import { promises as fs } from 'fs';
import { getUserCookie, getVisibles } from './actions';
import { Settings } from 'settings/users/settingstype';
import deviceList from 'users/deviceobjects';
import { DeviceSettingsType } from 'settings/devices/devicesettingstype';
import { MdDataSaverOff } from 'react-icons/md';

type deviceandsettings = {
    devicename : string;
    settings : DeviceSettingsType;
}

export async function myFileCreator(data: string, filename: string) {

  // 1. Convert your string into a NodeJS Buffer
//   const bufferString = Buffer.from("Hello universe!");

//   // 2. Convert your buffer into a Uint8Array
//   const content = new Uint8Array(bufferString);

  // 3. Specify file name or path

  // 4. Write the file!
  await fs.writeFile(filename, data); 
}

export async function myFileRead(filename: string) {
    const data = String(await fs.readFile(filename,'utf-8'));
    return data;
}

export async function saveSettings(data : Settings){
    const cookie = await getUserCookie();
    if (cookie === null || cookie === undefined) {
        // error
    }
    else{
        await myFileCreator(JSON.stringify(data), cookie.settings)
        console.log('success')
    }
}

export async function saveDeviceSettings(data : DeviceSettingsType[] ){
    const visibles = await getVisibles();
    if (visibles === undefined){
 //TODO replace with error
    }
    else{
        const deviceids = visibles.devices;
        var devicesettingsstring : string;
        const devices = deviceList.filter(device=>
            deviceids.includes(device.id))

        for (let i = 0; i<devices.length; i++){
            const device = devices[i]
            await myFileCreator(JSON.stringify(data[i]), device.settings)
            console.log('success')
        }
    }
}


export async function getSettingsFile(){
    const cookie = await getUserCookie();
    if (cookie === null || cookie === undefined) {
        return undefined //TODO replace with error
    }
    else{
        try{
            var data = await myFileRead(cookie.settings)
        }
        catch(error){
            data = await myFileRead('./src/settings/users/template.json');
        }
        finally{
            return data
        }
    }
}

export async function getDevicesSettings(){
    const visibles = await getVisibles();
    var data : deviceandsettings[] = []
    if (visibles === undefined){
        return undefined //TODO replace with error
    }
    else{
        const deviceids = visibles.devices;
        var devicesettingsstring : string;
        const devices = deviceList.filter(device=>
            deviceids.includes(device.id))

        for (const device of devices){
            try{
                devicesettingsstring = await myFileRead(device.settings)
            }
            catch(error){
                devicesettingsstring = await myFileRead('./src/settings/devices/template.json')
            }
            finally{
                const devicesettings : DeviceSettingsType = JSON.parse(devicesettingsstring)
                data = data.concat([{devicename:device.name, settings:devicesettings}])
            }
        }
    }
    console.log
    return data;

}



        //    if (user !== null){
//       console.log('hi');
//       myFileRead(user.settings).then((value)=>setfilestate(value));
//     }
//   },[]);

//   if(readfile === undefined){
//     useEffect(() => {
//       settemplate(null);
//       myFileRead('/settings/settingstype.tsx').then((value)=>settemplate(value));