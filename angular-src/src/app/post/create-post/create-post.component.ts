import { ValidateService } from './../../services/validate.service';
import { PostsService } from './../../services/posts.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from '../post-model';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  username;
  name: String;
  img: String;
  text: String;
  dateCreated = Date();

  // processing = false;


  constructor(private authService: AuthService,
    private postsService: PostsService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });
  }

  savePost() {
    const post = {
      name: this.name,
      img: this.img,
      text: this.text,
      ownerName: this.username,
      // dateCreated: this.dateCreated
    }

    this.postsService.createPost(post).subscribe(post => {
      if(post) {
        this.flashMessage.show('You have registered successfully', {classes: ['alert' ,'alert-success'], timeout: 3000});
        console.log('created' + post);
        this.router.navigate(['/home']);
      } else {
        this.flashMessage.show('The registration was not successful', {classes: ['alert' ,'alert-danger'], timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
