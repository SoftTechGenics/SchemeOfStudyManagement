<template>
  <div class="container">
    <div class="col-md-8 offset-2 ">
      <form @submit.prevent="updateCourse">
        <div class="row mb-3">
          <label for="inputcode" class="col-sm-2 col-form-label">Course Code</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputcode" v-model="Course_Code">
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputtitle" class="col-sm-2 col-form-label">Course Title</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputtitle" v-model="Course_Title">
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputCreditHours" class="col-sm-2 col-form-label">Credit Hours</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" id="inputCreditHours" v-model="Credit_Hours">
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputSemester" class="col-sm-2 col-form-label">Semester</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" id="inputSemester" v-model="Semester">
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputCourseType" class="col-sm-2 col-form-label">Course Type</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputCourseType" v-model="Course_Type">
          </div>
        </div>
        <button type="submit" class="btn btn-outline-success">Update Course</button>
      </form>
      <div class="alert alert-danger alert-dismissable fade show mt-5" role="alert" v-if="error">
        {{error}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        id:{
            type:[Number , String],
            required:true,
        }
    },
    data(){
    return{
      Course_Code:null,
      Course_Title:null,
      Credit_Hours:null,
      Semester:null,
      Course_Type:null,
      error:null
    }
  },
  methods:{
    updateCourse(){
        if (!this.Course_Code || !this.Course_Title || !this.Credit_Hours || !this.Semester || !this.Course_Type) {
            this.error = "Please fill all the required fields!"
        } else {
            fetch(`http://127.0.0.1:5000/update/${this.id}`, {
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({Course_Code:this.Course_Code, Course_Title:this.Course_Title, Credit_Hours:this.Credit_Hours, Semester:this.Semester, Course_Type:this.Course_Type})
            })
            .then(response => response.json())
            .then( () => {
                this.$router.push({
                    name:'homepage'
                    
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
  },

  beforeRouteEnter(to,from,next){
    if(to.params.id !== undefined){
        fetch(`http://127.0.0.1:5000/get/${to.params.id}`, {
        method:'GET',
        headers:{
          "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then( data => {
            return next(vm=>(vm.Course_Code = data.Course_Code , vm.Course_Title = data.Course_Title , vm.Credit_Hours = data.Credit_Hours, vm.Semester = data.Semester, vm.Course_Type = data.Course_Type))
        })
        .catch(error => {
            console.log(error)
        })
    } else{
        return next()
    }
  }

}
</script>

<style>

</style>