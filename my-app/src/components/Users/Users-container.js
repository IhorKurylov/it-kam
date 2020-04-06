import React from "react";
import {connect} from "react-redux";
import {
    follow, followSuccess, getUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow, unfollowSuccess
} from "../../redux/users-reducer";
import Users from "./Users"
import Preloader from "../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Dialogs from "../Dialogs/Dialogs";
import {compose} from "redux";


class UsersContainer extends React.Component {
    componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize);
    };

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize);

    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   onPageChanged={this.onPageChanged}
                   followingInProgress = {this.props.followingInProgress}

            />
        </>
    }
}

let mapStateToProps = (state) => {

    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};

let AuthRedirectComponent = withAuthRedirect(UsersContainer);

export default compose(
    connect(mapStateToProps, {
        followSuccess, unfollowSuccess, setCurrentPage,
        toggleFollowingProgress,
        getUsers, follow, unfollow
    }),
    withAuthRedirect)(UsersContainer)