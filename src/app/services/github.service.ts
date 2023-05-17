import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Repository} from '../../../Models/Repository';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient: HttpClient) { }
  public getRepos (){
    const uri = "/.netlify/functions/githubRepos"
    return this.httpClient.get<Repository[]>(uri);
  }
}
