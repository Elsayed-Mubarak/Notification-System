Message.aggregate(
    [
        { "$match": { "to": user } },
        { "$sort": { "date": 1 } },
        { "$group": { 
            "_id": "from",
            "to": { "$first": "$to" },
            "message": { "$first": "$message" },
            "date": { "$first": "$date" },
            "origId": { "$first": "$_id" }
        }},
        { "$lookup": {
             "from": "users",
             "localField": "from",
             "foreignField": "_id",
             "as": "from"
        }},
        { "$lookup": {
             "from": "users",
             "localField": "to",
             "foreignField": "_id",
             "as": "to"
        }},
        { "$unwind": { "path" : "$from" } },
        { "$unwind": { "path" : "$to" } }
    ],
    function(err,results) {
        if (err) throw err;
        return results;
    }
)