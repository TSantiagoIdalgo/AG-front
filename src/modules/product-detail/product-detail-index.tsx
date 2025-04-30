/* eslint-disable consistent-return */
import './product-detail-index.css';
import * as Detail from './components/product-detail-components';
import * as libs from './libs/product-detail-libs';
import { PRODUCT_ENDPOINT } from '#src/config/endpoints.ts';
import { ProductWithUserProps } from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import ReviewsModal from './components/reviews-modal/reviews-modal';
import ReactDOM from 'react-dom';
import { scrollInToView } from './utils/scroll-in-to-view';


export default function ProductDetailIndex(): React.JSX.Element {
  const { id } = libs.useParams();
  const [modal, handleModal] = libs.useState(false);
  const { loading, data } = libs.useFetchData<ProductWithUserProps>(PRODUCT_ENDPOINT.GET.findWithIsInWishlist(UUIDBase64.base64ToUuid(id as string)));
  const navigate = libs.useNavigate();

  libs.useEffect(() => {
    if (data?.body.error) return navigate('/');
    else if (data?.body.data) document.title = `Comprar ${data.body.data.product.name}`;
  }, [data?.body]);

  libs.useEffect(() => {
    const writeReview = 'write-review';
    const onScrollTime = 500;
    if (window.location.hash.includes(writeReview)) {
      scrollInToView('reviews');
      setTimeout(() => {
        handleModal(true);
      }, onScrollTime);
    }
  }, []);

  if (loading || !data?.body.data) return <p>Loading...</p>;

  const { backgroundImage, name, description, developer, tags, genres, release_date, distributor, pegi, trailer, images, requirements } = data.body.data.product;
  
  return (
    <main className='product-detail-index'>
      <Detail.HeaderDetail backgroundImage={backgroundImage} name={name}/>
      <section className='panel-section'>
        <Detail.PanelDetail inWishlist={data.body.data.inWishlist} product={data.body.data.product}/>
        <Detail.AboutDetail description={description} developer={developer} genres={genres} tags={tags} distributor={distributor} release_date={release_date} pegi={pegi}/>
        <Detail.VisualsDetail images={images} trailer={trailer}/>
        <Detail.DescriptionDetail description={description} />
        <Detail.ConfigurationDetail requirements={requirements}/>
        <Detail.ReviewsDetail isPurchased={data.body.data.purchasedByUser} handleModal={handleModal}/>
      </section>
      {modal && ReactDOM.createPortal(<ReviewsModal userReviewed={data.body.data.userReviewed} productId={id as string} handleModal={handleModal}/>, document.getElementById('modal') as HTMLElement)}
    </main>
  );
}