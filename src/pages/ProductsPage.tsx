import PortfolioGrid from "../components/Portfolio/PortfolioGrid";
import { products } from "../data/portfolio";
import { productsContent } from "../data/content";

const ProductsPage: React.FC = () => {
  return (
    <section className="container active" id="products">
      <div className="page-header anim-fade-up">
        <span className="page-tag">
          <i className="fas fa-cube"></i> {productsContent.pageTag}
        </span>
        <h2 className="page-title">
          {productsContent.pageTitle}{" "}
          <span className="highlight">{productsContent.pageTitleHighlight}</span>
        </h2>
        <p className="page-subtitle">{productsContent.pageSubtitle}</p>
      </div>
      <PortfolioGrid items={products} />
    </section>
  );
};

export default ProductsPage;
