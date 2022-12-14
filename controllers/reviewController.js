const reviewService = require('../services/reviewService.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createReview = async (req, res) => {
  const { name, email, rating, title, content, product_id } = req.body;

  const hasKey = {
    name: false,
    email: false,
    rating: false,
    title: false,
    content: false,
    product_id: false,
  };

  /** 받아온 데이터에 키 + 벨류 값이 존재하는지 확인하는 코드 */
  const requireKey = Object.keys(hasKey);

  Object.entries(req.body).forEach(keyValue => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value) {
      hasKey[key] = true;
    }
  });
  /** 받아온 데이터에 키 + 벨류 값이 없을때 에러를 표시해주는 코드*/
  const hasKeyArray = Object.entries(hasKey);
  for (let i = 0; i < hasKeyArray.length; i++) {
    const [key, value] = hasKeyArray[i];
    if (!value) {
      res.status(400).json({ message: `${key}이/가 없습니다.` });
      return;
    }
  }
  /** 이메일 형식 체크하는 함수 */
  const emailCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (emailCheck.test(email) == false) {
    res.status(400).json({ message: '이메일 형식이 올바르지 않습니다.' });
    return;
  }

  try {
    const userReview = await reviewService.createReview(
      name,
      email,
      rating,
      title,
      content,
      product_id
    );

    res.status(200).json({ message: '리뷰 작성 성공!' });
  } catch (err) {
    res.status(500);
  }
};

const productReview = async (req, res) => {
  const {product_id} = req.body;
  const productReview = await reviewService.productReview(product_id);
  res.send(productReview)
  return productReview;
};

const reviewDelete = async(req,res) => {
  const {id, product_id, email} = req.body;
  console.log(id)
  const reviewDelete = await reviewService.reviewDelete(id,email)
  const productReview = await reviewService.productReview(product_id);
  res.send(productReview)
  return reviewDelete
}

module.exports = {
  createReview,
  productReview,
  reviewDelete
};
