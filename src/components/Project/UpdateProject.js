import React, { Component } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";

class UpdateProject extends Component {
  //set state
  //   state = {
  //     id: this.props.project.id,
  //     projectName: this.props.projectName,
  //     projectIdentifier: this.props.projectIdentifier,
  //     description: this.props.project.description,
  //     start_date: this.props.project.start_date,
  //     end_date: this.props.project.end_date,
  //   };
  constructor() {
    super();
    // const iid = this.props.match.params.id;
    // const iid = this.props.location.state.iid;
    // this.props.getProject(iid, this.props.history);
    //this.props.getProject(iid);

    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {},
    };
    //console.log("Im constructor:" + this.props.project.project.id);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // const iid = this.props.location.state.iid;
    // console.log("iid:   " + iid);
  }

  // replacement of componentWillReceiveProps(nextProps)
  // lifecycle sequence: constructor->getDerivedStateFromProps -> render -> componentDidMount
  // this will get called whenever changes happen in state or props, need to use if-condition to prevent unwanted update.
  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    if (state.id !== props.project.id) {
      console.log(" get props project: " + props.project);
      const {
        id,
        projectName,
        projectIdentifier,
        description,
        start_date,
        end_date,
      } = props.project;
      console.log("getD project id : " + props.project.id);
      return {
        id,
        projectName,
        projectIdentifier,
        description,
        start_date,
        end_date,
        // isFirstTime: 1,
      };
    }
    return null;
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(" get props project: " + props.project);
  //   const {
  //     id,
  //     projectName,
  //     projectIdentifier,
  //     description,
  //     start_date,
  //     end_date,
  //   } = props.project;
  //   console.log("getD project id : " + props.project.id);
  //   return {
  //     id,
  //     projectName,
  //     projectIdentifier,
  //     description,
  //     start_date,
  //     end_date,
  //     isFirstTime: 1,
  //   };
  // }

  // componentDidUpdate(props, state, snapshot) {
  //   // const {
  //   //   id,
  //   //   projectName,
  //   //   projectIdentifier,
  //   //   description,
  //   //   start_date,
  //   //   end_date,
  //   // } = props.project;

  //   this.setState({
  //     // id,
  //     //projectName,
  //     // projectIdentifier,
  //     // description,
  //     // start_date,
  //     // end_date,
  //   });
  // }

  // if (props.currentRow !== state.lastRow) {
  //   return {
  //     isScrollingDown: props.currentRow > state.lastRow,
  //     lastRow: props.currentRow,
  //   };
  // }

  // // Return null to indicate no change to state.
  // return null;
  //}

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     id,
  //     projectName,
  //     projectIdentifier,
  //     description,
  //     start_date,
  //     end_date,
  //   } = nextProps.project;

  //   this.setState({
  //     id,
  //     projectName,
  //     projectIdentifier,
  //     description,
  //     start_date,
  //     end_date,
  //   });
  // }

  componentDidMount() {
    const iid = this.props.match.params.id;
    this.props.getProject(iid, this.props.history);

    // this.setState((state, props) => ({
    //   ...state,
    //   projectName: props.project.projectName,
    // }));

    // console.log(
    //   "Didmount run, project name : " + this.props.project.projectName
    // );

    // console.log("didmount run");
    // const {
    //   id,
    //   projectName,
    //   projectIdentifier,
    //   description,
    //   start_date,
    //   end_date,
    // } = this.props.project;
    // //console.log("didmount run id: " + this.props.project.project.projectName);
    // this.setState({
    //   // id: this.props.project.id,
    //   // projectName: this.props.projectName,
    //   // projectIdentifier: this.props.projectIdentifier,
    //   // description: this.props.project.description,
    //   // start_date: this.props.project.start_date,
    //   // end_date: this.props.project.end_date,
    //   id,
    //   projectName,
    //   projectIdentifier,
    //   description,
    //   start_date,
    //   end_date,
    // });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const updateProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.createProject(updateProject, this.props.history);
  }

  render() {
    // const iid = this.props.match.params.id;
    // this.props.getProject(iid, this.props.history);
    console.log("render run id: " + this.props.project.projectName);

    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.onChange}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    onChange={this.onChange}
                    disabled
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
