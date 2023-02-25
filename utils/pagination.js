const pagination = (query, count) => {
	query.page = Number(query.page)
	query.perPage = Number(query.perPage)
	count = Number(count)
	return {
		page: query.page,
		per_page: query.perPage,
		previous_page: query.page <= 1 ? null : query.page - 1,
		next_page: count / query.perPage > query.page ? query.page + 1 : null,
		total_page: Math.ceil(count / query.perPage),
		total_data: count,
	}
}

module.exports = { pagination }
