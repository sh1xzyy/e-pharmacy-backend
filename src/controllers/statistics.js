import {
  getGoodStatisticsById,
  getStatistics,
} from "../services/statistics.js";

export const getStatisticsController = async (req, res) => {
  const data = await getStatistics();

  res.status(200).json({
    status: 200,
    message: "Successfully get statistics",
    data,
  });
};

export const getGoodStatisticsByIdController = async (req, res) => {
  const data = getGoodStatisticsById(req);

  res.status(200).json({
    status: 200,
    message: "Successfully get good statistics by id",
    data,
  });
};
