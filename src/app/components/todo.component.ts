import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  form!: FormGroup
  itemArray!: FormArray

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
      this.form = this.createForm()
  }

  private createForm(): FormGroup {
    this.itemArray = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('swim', [Validators.required, Validators.min(3)]),
      dueDate: this.fb.control<string>('20/04/2023', [Validators.required]),
      tasks: this.itemArray
    })
  }

  private createTaskItem(): FormGroup {
    return this.fb.group({
      taskName: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.group<string>('')
    })
  }

  processTask() {
    const task : Task = this.form.value
    console.info(">>>task: ", task)
    this.form.reset()
  }

  addTask() {
    //console.info(">>>task: ")
    const taskItem = this.createTaskItem
    this.itemArray.push(taskItem)
  }

  deleteTask(idx: number) {
    this.itemArray.removeAt(idx)
  }
}
