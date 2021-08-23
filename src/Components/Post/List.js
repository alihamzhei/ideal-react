import animate from './../Partials/animate';
import { StyleRoot } from 'radium';
import Breadcrumb from "../Partials/Breadcrumb";
import breadcrumb from "../../breadcrub";
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import Item from './Item';
import Post from '../../Api/Post';
function List(props) {

    let [paginate, setPaginate] = useState({ links: [], status: false });

    useEffect(() => {
        Post.ListPost(props.location.search, (data) => {

            setPaginate(preve => {
                return {
                    ...preve,
                    links: data.meta.links,
                    total: data.meta.last_page,
                 
                    status: true
                }
            })
            props.dispatch(actions.ListPost(data))
        })
    }, [])

    let handlePaginate = (url) => {
        if (url) {
            let page = url.split("?").slice(-1).pop()
            props.history.push(props.location.pathname + '?' + page)
            Post.ListPost(page, (data) => {
                setPaginate(preve => {
                    return {
                        ...preve,
                        links: data.meta.links,
                        total: data.meta.last_page,
                        status: true
                    }
                })
                props.dispatch(actions.ListPost(data))
            })

        }
    }
    let header = breadcrumb('posts.list');





    return (
        <>
            <Breadcrumb header={header} />

            <StyleRoot>

                <div className="content content-full" style={animate.bounce}>
                    <div className="block block-rounded">

                        <div className="block-content">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover table-vcenter">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: 50 }}>ردیف</th>
                                            <th>عنوان</th>
                                            <th>عکس</th>
                       
                                            <th className="d-none d-sm-table-cell" >وضعیت</th>
                                            <th className="text-center" style={{ width: 100 }}>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody>



                                        {
                                            props.posts.map((item, index) => <Item history={props.history} key={item.id} {...item} index={index + 1} />)
                                        }





                                    </tbody>
                                </table>
                            </div>
                        
                        </div>
                     
                    </div>
                    <nav aria-label="Page navigation">
                                <ul className="pagination pagination-lg">



                                    {
                                        paginate.total <= 1 && paginate.status ? '' :
                                            paginate.links.map(item => (


                                                <li className={`page-item ${item.active ? 'active' : ''}`}>
                                                    <a onClick={e => {e.pageX = 0; handlePaginate(item.url)}} class="page-link" href="javascript:void(0)" aria-label="Next">
                                                        <span aria-hidden="true">
                                                            {item.label}
                                                        </span>
                                                        <span className="sr-only">Next</span>
                                                    </a>
                                                </li>

                                            ))
                                    }


                                </ul>
                            </nav>
                </div>



            </StyleRoot>

        </>
    );
}

let mapStateToProps = (state) => {
    return {
        posts: state.posts.posts
    }
}
export default connect(mapStateToProps)(List);