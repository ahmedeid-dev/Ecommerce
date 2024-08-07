class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = structuredClone(this.queryString);
        const excludedFields = ['page', 'sort', 'limit', 'fields','search'];
        excludedFields.forEach(ele => delete queryObj[ele]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    fields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.page = page;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    // ! not completed yet
    search() {
        if (this.queryString.search) {
            this.query.find({
                $or: [
                    { title: { $regex: this.queryString.search, $options: 'i' } },
                    { name: { $regex: this.queryString.search, $options: 'i' } },
                    { description: { $regex: this.queryString.search, $options: 'i' } }
                ]
            })
        }
        return this;
    }
}

function apiFeatures(query, queryString) {
    let features= new ApiFeatures(query, queryString)
        .sort()
        .search()
        .fields()
        .filter()
        .pagination()
    return features;
}

export default apiFeatures;