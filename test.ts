const test = object({
    firstName: string(),
    lastName: group([
        required(),
        string(),
    ]).when(required().ref('firstName')),
});

console.log(test);
