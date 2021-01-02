// Logic will be here

const data = require("./data/users.json");
const url = require('url');
const logger = require('./logs.js');
const fs = require('fs');

const getallusers = (req, res) => {
    let countrynotfound = false;
    //filter by country
    if(req.body.country != undefined){
        let j=0;
        let newarray = [];
        for(let i in data){
            const user = data[i];          
            if(user.country == req.body.country){
                newarray[j] = user;
                j++;
                countrynotfound = true;
            }
        }
        if(countrynotfound){
            res.status(200).json(newarray);
            logger.success(`Found users with country: ${req.body.country}`, JSON.stringify(newarray), "GET", req);
            return JSON.stringify(newarray);
        }
        //if country not found
        else{
            logger.error(`Didn't found users with country: ${req.body.country}`,req,"GET"); 
            res.status(404).json({"error":"Users not found"});
        }
    }
    //All users
    else if (data.length >= 1){
        logger.success1("All users found", JSON.stringify(data), "GET");
        res.status(200).json(data);
        return JSON.stringify(data);
    }
    //if the json file is empty
    else{
        logger.error("Empty file",req,"GET"); 
        res.status(404).json({"error":"Users not found"});
    }
}

//find user by ID 
const finduser = (req,res) => {
    let foundusere = false;
    for(let i=0; i < data.length; i++){
        const user = data[i];
        if(user.id == req.params.id){
            foundusere = true;
            res.status(200).json(user);
            logger.success("User found", JSON.stringify(user), "GET",req);
            return JSON.stringify(user);
        }
    }
    //if there is no user with this ID
    if(!foundusere){
        res.status(404).json({"error": "User not found"});
        logger.error("User wasn't found",req,"GET");
    }
}

//too add user it is must to send his ID
const adduser = (req, res) =>{
    if(req.body == undefined || req.body.id == undefined){
        res.status(404).json({"error": "User wasnt added"});
        logger.error("User wasn't added",req,"POST");
    }
    else{
        const user = {...req.body};
        data.push(user);
        logger.success("The user was added", user, "POST",req);
        res.status(200).json({"Succsses":"The user added!"});
    }
}

//delete user, get user id from the req.params
const deleteuser = (req, res) =>{
    const { id } = req.params;
    if(data[id] == undefined ){
        //if there is no user with this id
        res.status(404).json({"error": "User not found"});
        logger.error("User not found",req,"DELETE");
    }
    else{
        let index = Number(id);
        index--;
        data.splice(index ,1);
        res.status(200).json({"Succsses":"The user deleted!"});
        logger.success2("User deleted","DELETE",req);

    }
}

//checking witch values from the requst body we get and updat for the user
const updateuser = (req, res) => {
    const { id } = req.params;
    let index = Number(id);
    index--;

    if(data[index]){
        if(req.body.first_name){
            data[index].first_name = req.body.first_name;
        }
        if(req.body.last_name){
            data[index].last_name = req.body.last_name;
        }
        if(req.body.email){
            data[index].email = req.body.email;
        }
        if(req.body.gender){
            data[index].gender = req.body.gender;
        }
        if(req.body.country){
            data[index].country = req.body.country;
        }
        if(req.body.color){
            data[index].color = req.body.color;
        }
        res.status(200).json({"Succsses":`User with the id ${id} has been update`});
        logger.success(`The user(${id}) was updated`, JSON.stringify(data[index]), "PUT",req);
    
    }
    else{
        //if there is no user with this id
        res.status(404).json({"error": `User(${id}) not update`});
        logger.error(`User(${id}) wasn't updated`,req,"PUT");
    }
}

//get all logs in file: logs.txt
const alllogs = (req, res) =>{
    if(fs.existsSync('./logs.txt')){
        const content = fs.readFileSync('./logs.txt','utf-8');
        res.send(content);
    }
    else{
        res.status(404).json({"error": `The file does not exist`});
        logger.error(`The file dosnt exist`,req, "GET");
    }
}

//if page not found
const all = (req, res) =>{
    res.status(404).json({"Error": "Page not found"})
    logger.error("Page not found",req,"GET");
}

module.exports = {getallusers, finduser, adduser, deleteuser, updateuser, alllogs, all};



