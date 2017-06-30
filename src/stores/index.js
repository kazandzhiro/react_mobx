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
  fetchProduct = async(id) => {
    try{
      this.product = await api.fetchProduct(id);
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
  create = (product) => {
    product.key = Math.floor((1 + Math.random()) * 10000)
    this.products.push(product);
  }

  @action
  update = (id, newData) => {
    if(!id) return this.create(newData)
    this.products = this.products.map(product => product.key === id ? newData : product);
  }

  @action
  delete = (id) => {
    this.products = this.products.filter(product => product.key !== id);
  }
}

export default Store;
