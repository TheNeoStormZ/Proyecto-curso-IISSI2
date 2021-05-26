from silence.decorators import endpoint

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM Category"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Category (categoryId, categoryName) VALUES ($categoryId, $categoryName)"
)
def get_by_id(categoryId,categoryName):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/categories",
    method="POST",
    sql="INSERT INTO photocategories (categoryId, photoId) VALUES ($categoryId, $photoId)"
)
def add_category_photo(categoryId):
    print(categoryId)

###############################################################################