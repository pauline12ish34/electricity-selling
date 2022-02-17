module.exports = (mongoose) => {
    var schema = mongoose.Schema(
        {
           
            money : String,
            meter: Number, 
            token: String,
            days:Number,    
            dateExp :Date,
            
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Transaction = mongoose.model("tutorial", schema);
    return Transaction;
};
