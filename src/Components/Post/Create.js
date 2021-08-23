import animate from './../Partials/animate';
import { StyleRoot } from 'radium';
import Breadcrumb from "../Partials/Breadcrumb";
import breadcrumb from "../../breadcrub";
import CKEditor from 'ckeditor4-react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Upload from '../../Api/UploadFile';
import { connect } from 'react-redux';
import actions from '../../actions';
import { toast } from 'react-toastify';
import Input from './Taginput';
import PostCategory from '../../Api/PostCategory';
import Post from '../../Api/Post';


function Create(props) {

    useEffect(() => {
        PostCategory.ListPostCategory(data => {
            props.dispatch(actions.ListPostCategory(data))

        })
    }, []);

    let [title, setTitle] = useState('');
    let [category_id, setCategory_id] = useState('');
    let [slug, setSlug] = useState('');
    let [body, setBody] = useState('');
    let [img, setImg] = useState('');
    let [status, setStatus] = useState(true);
    let [meta_description, setMeta_description] = useState('');
    let [tags, setTags] = useState({ tags : []});
    let [meta_title, setMeta_title] = useState('');

    let [btn, setBtn] = useState(false);





    let handleForm = (e) => {
        e.preventDefault();
        setBtn(true)

        setTimeout(() => {
            setBtn(false)
        }, 5000);
        let image = '';
        if (props.files.image.length) {
            image = props.files.image[0].url;
        }

        Post.StorePost({ title, category_id, slug, meta_title, meta_description, body, tags, image, status }, (data) => {
            console.log(data)
            props.dispatch(actions.CreatePost(data));
            props.dispatch(actions.ClearImages());
            setTitle('');
            setCategory_id('');
            setSlug('');
            setMeta_description('');
            setMeta_title('');
            setBody('');
            setTags({tags : []})
            setStatus(false);
            props.history.push('/posts');
            toast.success('نمونه کار با موفقیت ایجاد شد .');


        })

    }


    let tagsHanle = (tags) => {
        setTags(tags)
    }


    let DeleteImage = (url) => {

        Upload.DeleteImages(url, (data) => {
            props.dispatch(actions.DeleteImg());
        })
    }
    let imgUpload = (e) => {
        let files = Array.prototype.slice.call(e.target.files);

        files.map(file => {
            const formData = new FormData();

            formData.append(
                "file",
                file,
                file.name,
            );
            Upload.UploadImages(formData, (data) => {
                props.dispatch(actions.ImgPortofilo(data))
            })
        })

        setImg('');




    }

    let header = breadcrumb('posts.create');



    return (
        <>
            <Breadcrumb header={header} />

            <StyleRoot>
                <div className="content content-full content-boxed" style={animate.bounce}>
                    <form onSubmit={handleForm} method="POST" encType="multipart/form-data" >
                        <div className="block">
                            <div className="block-header block-header-default">
                                <a className="btn btn-light" style={{ fontFamily: 'IRANSansfanum' }} href="be_pages_blog_post_manage.html">
                                    <i className="fa fa-arrow-left mr-1" />  ایجاد نمنه کار
                                </a>
                                <div className="block-options">
                                    <div className="custom-control custom-switch custom-control-success">
                                        <input type="checkbox" onChange={e => setStatus(e.target.checked)} value={status} className="custom-control-input" id="dm-post-add-active" checked={status} />
                                        <label className="custom-control-label" htmlFor="dm-post-add-active">فعال</label>
                                    </div>
                                </div>
                            </div>
                            <div className="block-content">
                                <div className="row justify-content-center push">
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-md-6 form-group">

                                                <label htmlFor="dm-post-add-title">عنوان</label>

                                                <input type="text"
                                                    className="form-control"
                                                    id="dm-post-add-title"
                                                    name="title"
                                                    value={title}
                                                    onChange={e => setTitle(e.target.value)}
                                                    placeholder="عنوان نمونه کار را وراد کنید ..."
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">

                                                <label htmlFor="dm-post-add-title">دسته بندی</label>

                                                <select type="text"
                                                    className="form-control"
                                                    id="dm-post-add-title"
                                                    name="title"
                                                    value={category_id}
                                                    onChange={e => setCategory_id(e.target.value)}
                                                    placeholder="عنوان نمونه کار را وراد کنید ..."
                                                >
                                                    <option selected>انتخاب کنید</option>
                                                   
                                                   {
                                                       props.post_category.map(item => (<option key={item.id} value={item.id} >{item.name}</option>))
                                                   }

                                                </select>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">

                                                <label htmlFor="dm-post-add-title">آدرس (url)</label>

                                                <input type="text"
                                                    className="form-control"
                                                    id="dm-post-add-title"
                                                    name="title"
                                                    value={slug}
                                                    onChange={e => setSlug(e.target.value)}
                                                    placeholder="عنوان نمونه کار را وراد کنید ..."
                                                />
                                            </div>
                                            <div className="col-md-6 form-group">

                                                <label htmlFor="dm-post-add-title">عنوان سئو</label>

                                                <input type="text"
                                                    className="form-control"
                                                    id="dm-post-add-title"
                                                    name="title"
                                                    value={meta_title}
                                                    onChange={e => setMeta_title(e.target.value)}
                                                    placeholder="عنوان نمونه کار را وراد کنید ..."
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">

                                                <label htmlFor="dm-post-add-title"> توضیحات سئو</label>

                                                <textarea type="text"
                                                    rows="5"
                                                    className="form-control"
                                                    id="dm-post-add-title"
                                                    name="title"
                                                    value={meta_description}
                                                    onChange={e => setMeta_description(e.target.value)}
                                                    placeholder="عنوان نمونه کار را وراد کنید ..."
                                                >
                                                </textarea>
                                            </div>
                                            <Input handleTag={tagsHanle} tags={tags} />
                                        </div>


                                        <div className="form-group text-ckeditor">
                                            <label htmlFor="dm-post-add-excerpt">توضیحات کلی</label>

                                            <CKEditor
                                                data={body}
                                                onChange={evt => setBody(evt.editor.getData())}
                                                config={{

                                                    fontFamily: {
                                                        options: [
                                                            'IRANSansfanum',
                                                        ],
                                                    },
                                                    fontSize: {
                                                        options: [9, 11, 13, "default", 17, 19, 21],
                                                    },
                                                    language: ['fa']

                                                }}
                                            />
                                            <div className="form-text text-muted font-size-sm font-italic"></div>
                                        </div>


                                        <label className="mt-2">تصویر شاخص</label>

                                        <div className="row dropzone p-2">
                                            <input
                                                type="file"
                                                className="dropzone-input"
                                                id="dm-post-add-image"
                                                name="img"
                                                value={img}
                                                onChange={e => imgUpload(e)}
                                                data-toggle="custom-file-input"
                                            />
                                            {

                                                props.files.image.map(item => (

                                                    <div key={item.url} className="uploaded-pics" >
                                                        <div className='image-drup'>
                                                            <div className="img-box">
                                                                <img src={`http://localhost:8000/storage${item.url}`} />
                                                            </div>
                                                            <Button className="remove-btn" variant="danger" size="sm" onClick={e => DeleteImage(item.url)}>
                                                                حذف
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))
                                            }


                                        </div>






                                    </div>
                                </div>
                            </div>
                            <div className="block-content bg-body-light">
                                <div className="row justify-content-center push">
                                    <div className="col-md-10">
                                        <button type="submit" className="btn btn-alt-primary" disabled={btn}>
                                            <i className="fa fa-fw fa-check mr-1" />  ایجاد
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </StyleRoot>

        </>
    );
}

let mapStateToProps = (state) => {
    return {
        files: state.files,
        post_category : state.post_category.categories
    }
}
export default connect(mapStateToProps)(Create);