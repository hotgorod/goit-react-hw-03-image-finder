import { Component } from 'react';
import css from './SearchForm.module.css';

class SearchForm extends Component {
  state = {
    value: '',
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleSubmit = e => {
      e.preventDefault();
    this.props.handleSearch(this.state.value);
    this.setState({ value: '' });
  };
  render() {
    return (
      <>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </>
    );
  }
}
export default SearchForm;
