import { observable, action } from 'mobx';
import api from '../mocks/api';

class Store {

  @observable errors = [];
  @observable product = {};
  @observable products = [];
  @observable isLoggedIn = false;
  @observable redirectPath = '/';
  @observable user = {};
  @observable isLoading = false;
  @observable redirect = false;

  inProgress = () => {
    this.isLoading = true;
    this.errors = [];
  }

  @action
  logIn = () => this.isLoggedIn = true;

  @action
  logOut = () => this.isLoggedIn = false;

  @action
  setRedirectUrl = pathname => pathname !== '/login' ? this.redirectPath = pathname : '/';

  @action
  setActiveUser = userData => this.user = userData;

  @action
  handleErrors = (errMsg) => {
    this.errors.push(errMsg);
    this.isLoading = false;
  }

  @action
  resetErrors() {
    this.errors = [];
  }

  @action
  resetRedirect() {
    this.redirect = false;
  }

  @action
  fetchAllProducts = async() => {
    this.inProgress();
    try{
      this.products = await api.fetchAllProducts();;
      this.isLoading = false;
    } catch(err) {
        this.handleErrors(err);
    }
  }

  @action
  fetchUser = async(user) => {
    this.inProgress();
    try{
      const foundUser = await api.fetchUser(user);
      if(foundUser) {
        this.logIn();
        this.setActiveUser(foundUser)
      }
      this.isLoading = false;
    } catch(err) {
        this.handleErrors(err);
    }
  }

  @action
  create = async(product) => {
    this.inProgress();
    try{
      const response = await this.service.create(product);
      this.entities.push(response);
      this.redirect = true;
      this.isLoading = false;
    } catch(err) {
        this.handleErrors(err);
    } finally {
      this.resetRedirect();
    }
  }

  @action
  fetch = async(_id) => {
    this.inProgress();
    try {
      const response = await this.service.get(_id)
      this.product = response;
      this.isLoading = false;
    } catch(err) {
      this.handleErrors(err)
    }
  }

  @action
  update = async(_id, product) => {
    this.inProgress();
    try{
      const response = await this.service.patch(_id, product);
      this.entities = this.entities.map(item => item._id === response._id ? response : item);
      this.redirect = true;
      this.isLoading = false;
    } catch(err) {
      this.handleErrors(err)
    } finally {
      this.resetRedirect();
    }
  }

  @action
  delete = async(_id) => {
    await this.service.remove(_id)
    try {
      this.entities = this.entities.filter(item => item._id !== _id)
    }
    catch(err) {
      this.handleErrors(err)
    }
  }
}

export default Store;
