import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { DbFunctionService } from 'src/app/db-function.service'; //servizio per connettersi all'API
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  //definisco le variabili per utilizzare i metodi HTTP
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private formBuilder: FormBuilder) { }

  //utilizzo @Input per ottenere dal componente showComponent i dati dello studente e la variabile per visualizzare la form
  public service : DbFunctionService = new DbFunctionService(this.http, this.baseUrl);
  @Input() student: Students;
  @Input() ActivateAddEditComponent : boolean;

  //form per contenere i dati dello studente
  studentForm = this.formBuilder.group({
    Nome: '',
    Cognome: '',
    DataDiNascita: '',
    Classe: '',
  });

  ngOnInit() {
  }
  
  //quando il pulsante nella form viene premuto
  submit()
  {
	//se il campo Nome dello studente è vuoto allora si aggiunge uno studente
    if(this.student.Nome=='')
    {
      var val = this.studentForm.value;
      this.addStudent(val);
      this.studentForm.reset();
    }
	//altrimenti si modifica uno studente
    else if(this.student.Nome!='')
    {
      var val : any = {
        StudenteID : this.student.StudenteID,
        Nome : this.studentForm.value.Nome,
        Cognome : this.studentForm.value.Cognome,
        DataDiNascita : this.studentForm.value.DataDiNascita,
        Classe : this.studentForm.value.Classe,
      }
      this.editStudent(val);
      this.studentForm.reset();
    }
  }

  //funzione per aggiungere uno studente utilizzando il servizio DbFunctionService per connettersi all'API
  addStudent(val: any)
  {
    this.service.addStudents(val).subscribe(result =>
      {
        alert(result.toString());
      });
  }
  
  //funzione per modificare uno studente utilizzando il servizio DbFunctionService per connettersi all'API
  editStudent(val : any)
  {
    this.service.updateStudents(val).subscribe(result =>
      {
        alert(result.toString());
      });
  }

}

//definisco l'interfaccia che rappresenta la tabella studente
interface Students {
  StudenteID : number;
  Nome: string;
  Cognome: string;
  DataDiNascita: string;
  Classe: string;
}
