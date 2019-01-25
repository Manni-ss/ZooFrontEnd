$(document).ready(function(){
    var tigger = new Tiger("Tigger");
    var rarity = new Unicorn("Rarity");
    var pooh = new Bear("Pooh");
    var gemma = new Giraffe("Gemma");
    var stinger = new Bee("Stinger");


    allAnimals.push(tigger, rarity, pooh, gemma, stinger);
    console.log(allAnimals);
    listAnimal();
    $("#feed").click(function(){
        feedAnimals();
    });
    $("#create").click(function(){
       createAnimal();
    });
    $("#" + allAnimals.name).click(function(){
        allAnimals.splice()
    });

});


var allAnimals = [];

function createAnimal(){

    var animalType = $("#animalSelector").val();
    var animal;
    var bank = $("#animalName").val();


    switch (parseInt(animalType)) {
        case 0:
            $("#actions").append("Please Select Animal Type" + '<br>');
            break;
        case 1:
            animal = new Tiger(bank);
            break;
        case 2:
            animal = new Giraffe(bank);
            break;
        case 3:
            animal = new Unicorn(bank);
            break;
        case 4:
            animal = new Bee(bank);
            break;
        case 5:
            animal = new Bear(bank);
            break;
    }
    if(bank==""){
        $("#actions").append("Please enter name <br>");
        return false;
    } else {
        $("#actions").append(animal.name + " was created" + "<br>");
        animalPopulation++;
    }
    allAnimals.push(animal);



    listAnimal();
}


function deleteAnimal(name){
    for(var i=0; i<allAnimals.length; i++){
        if(allAnimals[i].name == name){
            $("#actions").append(allAnimals[i].name + " was deleted " + "<br>");
            allAnimals.splice(i,1);

        }

    }
    animalPopulation--;
    if(animalPopulation==0){
        $("#actions").append("Uh oh, you killed all your animals :'( <br>")
    }

    listAnimal();
}


function feedAnimals(){
    $("#actions").empty();
    var food = $("#food").val();

    for(var i=0; i<allAnimals.length;i++){
        if(food!==0){
            allAnimals[i].eat(food);
        } else {
            $("#actions").append("error; please select meal")
        }
    }
    if(animalPopulation==0){
        $("#actions").append("No one to feed <br>");
    }
}

function listAnimal(){
    $("#table").empty();
    $("#table").append("<tr><td>" + "NAME:" + "</td><td>" + "SPECIES: " + "</td><td>" +"FAVORITE FOOD:" + "</td></tr>");

    for(var i=0; i<allAnimals.length; i++){
        console.log(allAnimals[i]);
        $("#table").append("<tr onclick='deleteAnimal(this.id)' id='" + allAnimals[i].name + "'><td> " + allAnimals[i].name + " </td>" + " <td>" + allAnimals[i].constructor.name + "</td><td>" + allAnimals[i].favoriteFood +"</td></tr>");
    }
    $("#population").html("Population:" + animalPopulation);


}

var animalPopulation = 5;

class Animal {
    // Put your instance variables here

    constructor(name,favoriteFood) {
        // initialize your vars here
        this.name=name;
        this.favoriteFood=favoriteFood;

    }
    static getPopulation(){
        return animalPopulation
    }

    sleep() {
        // complete your sleep function here
        $("#actions").append(this.name + " sleeps for 8 hours " + "<br>");

    }

    eat(food) {
        // complete your eat function here
        $("#actions").append(this.name + " eats " + food + "<br>");
        if(food == this.favoriteFood){
            $("#actions").append("YUM!!! " + this.name + " wants more " + food + "<br>");
        } else {
            this.sleep();
        }

    }
}

class Zookeeper {

    constructor(name){
        this.name=name;
    }
    feedAnimals(animals, food){
        console.log(this.name + " is feeding " + food + " to "+ animals.length + " of " + animalPopulation + " total animals");
        for(var i=0; i<animals.length; i++){
            animals[i].eat(food);
        }
    }
}

class Tiger extends Animal {

    constructor(name) {
        // put your constructor content here
        super(name,"meat");
    }

}
class Bear extends Animal{

    constructor(name) {
        // put your constructor content here
        super(name,"fish");
    }

    sleep() {
        // complete your sleep function here
        $("#actions").append(this.name + " hibernates for 4 months" + "<br>");
    }

}

class Unicorn extends Animal{
    constructor(name){
        super(name,"marshmallow");
    }
    sleep() {
        // complete your sleep function here
        $("#actions").append(this.name + " sleeps in a cloud" + "<br>");
    }
    eat(food) {
        // complete your eat function here
        if(food == this.favoriteFood){
            $("#actions").append("YUM!!! " + this.name + " wants more " + food + "<br>");
            this.sleep();
        }  else {
            super.eat(food);
        }

    }
}

class Giraffe extends Animal{
    constructor(name){
        super(name,"leaves")
    }
    eat(food) {
        // complete your eat function here

        if(food !== this.favoriteFood){
            $("#actions").append("YUCKY!!! " + this.name + " will not eat " + food + "<br>")
        } else {
            super.eat('leaves');
        }
    }
}
class Bee extends Animal{
    constructor(name){
        super(name,"pollen")
    }
    eat(food) {
        // complete your eat function here

        if(food !== this.favoriteFood) {
            $("#actions").append("YUCKY!!! " + this.name + " will not eat " + food + "<br>");
            this.sleep();


        } else {
            super.eat("pollen");
            this.sleep();
        }
    }
    sleep() {
        // complete your sleep function here
        $("#actions").append(this.name + " never sleeps" + "<br>");
    }


}


