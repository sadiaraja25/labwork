const mongoose = require('mongoose');

// 1. Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://sadiaraja25:lC0W9k9GLrnztjlF@sp22-bcs-088.cppnbcg.mongodb.net/labDB?retryWrites=true&w=majority&appName=sp22-bcs-088', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB Atlas!');

    // 2. Define Schema and Model
    const studentSchema = new mongoose.Schema({
        name: String,
        age: Number,
        grade: String
    });

    const Student = mongoose.model('Student', studentSchema);

    // 3. Insert multiple students
    const students = [
        { name: 'Alice', age: 21, grade: 'B' },
        { name: 'Bob', age: 22, grade: 'A' },
        { name: 'Charlie', age: 23, grade: 'C' }
    ];

    Student.insertMany(students)
        .then(inserted => {
            console.log('✅ Students inserted!');
            return Student.find();
        })
        .then(allStudents => {
            console.log('📋 All Students:', allStudents);

            // 4. Update a student’s grade
            return Student.updateOne({ name: 'Alice' }, { $set: { grade: 'A+' } });
        })
        .then(updateResult => {
            console.log('🔄 Student updated:', updateResult);

            // 5. Delete a student by ID (replace with a real ID)
            return Student.findOne({ name: 'Charlie' }); // find Charlie's ID dynamically
        })
        .then(studentToDelete => {
            if (studentToDelete) {
                return Student.findByIdAndDelete(studentToDelete._id);
            } else {
                throw new Error('Student not found for deletion.');
            }
        })
        .then(() => {
            console.log('❌ Student deleted!');
            mongoose.connection.close();
        })
        .catch(err => console.log('❗ Error:', err));

})
.catch(err => console.error('❌ Connection error:', err));
