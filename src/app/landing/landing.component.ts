import {Component, OnDestroy, OnInit} from '@angular/core';
import {GithubService} from '../services/github.service';
import {Repository} from '../../../Models/Repository';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  public repos: Repository[]= []
  private sub: Subscription = new Subscription();
  constructor(public githubService: GithubService) { }

 async ngOnInit(): Promise<void> {
    this.sub = this.githubService.getRepos().subscribe(x => this.repos = x)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }


}
