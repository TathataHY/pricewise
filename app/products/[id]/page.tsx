import Modal from "@/components/modal";
import PriceInfoCard from "@/components/price-info-card";
import ProductCard from "@/components/product-card";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProductDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container">
      <div className="flex xl:flex-row flex-col gap-28">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex flex-wrap justify-between items-start gap-5 pb-6">
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-[28px] text-secondary">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="opacity-50 text-base text-black"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />

                <p className="font-semibold text-[#D46F77] text-base">
                  {product.reviewsCount}
                </p>
              </div>

              <div className="bg-white-200 p-2 rounded-10 cursor-pointer">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>

              <div className="bg-white-200 p-2 rounded-10 cursor-pointer">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-[34px] text-secondary">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="opacity-50 text-[21px] text-black line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="font-semibold text-primary-orange text-sm">
                    {product.stars || "25"}
                  </p>
                </div>

                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="font-semibold text-secondary text-sm">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              <p className="opacity-50 text-black text-sm">
                <span className="font-semibold text-primary-green">93% </span>{" "}
                of buyers have recommeded this.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 my-7">
            <div className="flex flex-wrap gap-5">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>

          <Modal productId={id} />
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-2xl text-secondary">
            Product Description
          </h3>

          <div className="flex flex-col gap-4">
            {product?.description?.split("\n")}
          </div>
        </div>

        <button className="flex justify-center items-center gap-3 mx-auto w-fit min-w-[200px] btn">
          <Image
            src="/assets/icons/bag.svg"
            alt="check"
            width={22}
            height={22}
          />

          <Link href="/" className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="flex flex-col gap-2 py-14 w-full">
          <p className="section-text">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
