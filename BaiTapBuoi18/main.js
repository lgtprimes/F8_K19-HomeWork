// Bài 1
// const student = {
//   name: 'hoang',
//   parent: {
//     name: 'bo hoang'
//   }
// }

// const mentor = { ...student }

// mentor.name = 'bang'
// mentor.parent.name = 'bo bang'

// console.log(student);
// console.log(mentor);

/*
1. student.name có bị đổi không?

2. student.parent.name có bị đổi không?

3. Giải thích vì sao?
*/

/*
1. student.name không bị đổi.
2. student.parent.name có bị đổi.

3. vì khi dùng toán tử spread thì nó sẽ tạo ra 1 shallow copy của student nên mentor.name sẽ tham chiếu đến địa chỉ khác student.name 
nên khi thay đổi mentor.name thì student.name ko thay đổi, còn student.parent.name bị thay đổi là do shallow copy là sao chép nông và parent
là một object lồng bên trong nên khi dùng toán tử spread thì nó chỉ copy tham chiếu tới object đó chứ ko tạo ra bản sao mới 
=> thay đổi mentor.parent.name thì student.parent.name bị thay đổi
*/


// Bài 2
// const student = {
//   name: 'hoang',
//   parent: {
//     name: 'bo hoang'
//   }
// }

// const mentor = JSON.parse(JSON.stringify(student))

// mentor.parent.name = 'bo bang'

// console.log(student)
// console.log(mentor)

/*
1. student.parent.name có bị ảnh hưởng không?
- Không
2. Vì sao cách này khác spread (const mentor = { ...student })
- vì spread thì chỉ tạo ra shallow copy , nếu có object lồng bên trong thì nó chỉ copy tham chiếu 
- còn cách này thì nó chuyển toàn bộ object thành chuỗi JSON sau đó mới parse lại thành object mới nên các object lồng bên trong cũng được
tham chiếu tới địa chỉ mới
*/





// Bài 3
const students = [
  { name: 'a' },
  { name: 'b' }
]

const newStudents = [...students]

newStudents[0].name = 'z'

console.log(students)
console.log(newStudents)

/*
1. Mảng có bị thay đổi không?
- mảng ko bị thay đổi vì khi dùng toán tử spread (shallow copy) sẽ tạo ra mảng mới nên students vs newStudent lúc này là hai mảng khác nhau
2. Phần tử bên trong có bị không?
- có vì toán tử spread chỉ sao chép nông nên nó chỉ sao chép tham chiếu đến các object chứ ko tạo ra bản sao mới 
nên newStudents[0].name và students[0].name cùng trỏ đến một tham chiếu
*/

// Bài 4
const user = {
  name: 'hoang',
  address: {
    city: 'HN',
    location: {
      lat: 123
    }
  }
}

const newUser = { ...user }

newUser.address.location.lat = 999

console.log(user.address.location.lat)

// 1. Câu hỏi: Kết quả là bao nhiêu? Vì sao?
// kết quả là 999 vì spread operator chỉ tạo bản sao nông nên các object lồng bên trong vẫn tham chiếu cũ 
// nên khi newUser.address.location.lat = 999 thì user.address.location.lat cũng = 999
