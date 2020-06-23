import React from "react";
import { Table } from "react-bootstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class Listepisode extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      episodes: [],
      episodeInfo: null
    };
  }
  componentDidMount() {
    fetch("https://rickandmortyapi.com/api/episode/?page=1")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            episodes: result.results,
            episodeInfo: result.info
          });

          console.log(this.state);
        },
        error => {
          this.setState({ error });
        }
      );
  }

  getNextPrev(nextPrevValue) {
    console.log(nextPrevValue, this.state.episodeInfo);

    if (nextPrevValue === "next" && this.state.episodeInfo.next !== null) {
      fetch(this.state.episodeInfo.next)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              episodes: result.results,
              episodeInfo: result.info
            });
          },
          error => {
            this.setState({ error });
          }
        );
    } else if (
      nextPrevValue === "prev" &&
      this.state.episodeInfo.prev !== null
    ) {
      fetch(this.state.episodeInfo.prev)
        .then(res => res.json())
        .then(
          result => {
            this.setState({
              episodes: result.results,
              episodeInfo: result.info
            });
          },
          error => {
            this.setState({ error });
          }
        );
    }
  }

  search(key) {
    console.log(key);
    fetch("https://rickandmortyapi.com/api/episode/?name=" + key)
      .then(res => res.json())
      .then(
        result => {
          if (result.results) {
            this.setState({
              episodes: result.results,
              episodeInfo: result.info
            });
          } else {
            this.setState({
              episodes: [],
              episodeInfo: { prev: null, next: null }
            });
          }
        },
        error => {
          this.setState({ error });
        }
      );
  }

  render() {
    // var { error, episodes } = this.state;

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else {
      return (
        <div>
          <h1>Episode List</h1>
          <input
            type="text"
            onChange={event => this.search(event.target.value)}
          />

          <Table>
            <thead>
              <tr>
                <th>Eppisode Name</th>
                <th>Air Date</th>
                <th>Episode Code</th>
              </tr>
            </thead>
            <tbody>
              {this.state.episodes.map((episode, index) => (
                <tr key={episode.id}>
                  <td>{episode.name}</td>
                  <td>{episode.air_date}</td>
                  <td>{episode.episode}</td>
                </tr>
              ))}
              <tr>
                <td />
              </tr>
            </tbody>
          </Table>

          <Pagination aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink
                key="prev"
                onClick={event => this.getNextPrev("prev")}
              >
                Prev
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                key="next"
                onClick={event => this.getNextPrev("next")}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      );
    }
  }
}
export default Listepisode;
