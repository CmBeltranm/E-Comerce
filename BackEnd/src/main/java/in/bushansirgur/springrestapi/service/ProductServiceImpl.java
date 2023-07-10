package in.bushansirgur.springrestapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import in.bushansirgur.springrestapi.model.Product;
import in.bushansirgur.springrestapi.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductRepository pRepository;
	
	@Override
	public List<Product> getProducts(int pageNumber, int pageSize) {
		Pageable pages = PageRequest.of(pageNumber, pageSize, Direction.ASC, "id");
		return pRepository.findAll(pages).getContent();
	}

	

	@Override
	public Product getSingleProducts(Long id) {
		Optional<Product> product = pRepository.findById(id);
		if (product.isPresent()) {
			return product.get();
		}
		throw new RuntimeException("Product is not found for the id "+id);
	}

	@Override
	public void deleteProducts(Long id) {
		pRepository.deleteById(id);
	}

	
	@Override
	public List<Product> getProductsByName(String name) {
		return pRepository.findByName(name);
	}

	@Override
	public List<Product> getProductsByNameAndBrand(String name, long brand) {
		return pRepository.findByNameAndBrand(name, brand);
	}

	@Override
	public List<Product> getProductsByKeyword(String keyword) {
		Sort sort = Sort.by(Sort.Direction.ASC, "id");
		return pRepository.searchProduct(keyword,sort);
	}

	@Override
	public List<Product> getProductsByNameORBrand(String name, long brand) {
		return pRepository.getProductByNameAndBrand(name, brand);
	}

	@Override
	public Integer deleteByProductId(Long id) {
	    return pRepository.deleteProductById(id);
	}



	@Override
	public Product saveProducts(Product product) {
        return pRepository.save(product);
	}
	
	@Override
    public Optional<Product> getProductById(Long id) {
        return pRepository.findById(id);
    }



	@Override
	public Product updateProducts(Long id, Product product) {
		Optional<Product> existingProduct = pRepository.findById(id);
        if (existingProduct.isPresent()) {
            Product updatedProduct = existingProduct.get();
            updatedProduct.setCodeEAN(product.getCodeEAN());
            updatedProduct.setName(product.getName());
            updatedProduct.setPrice(product.getPrice());
            updatedProduct.setDescription(product.getDescription());
            updatedProduct.setBrand(product.getBrand());
            updatedProduct.setUnitsAvailable(product.getUnitsAvailable());
            updatedProduct.setImageUrl(product.getImageUrl());
            updatedProduct.setCategories(product.getCategories());

            return pRepository.save(updatedProduct);
        } else {
            throw new IllegalArgumentException("Product not found with ID: " + id);
        }
	}

	@Override
    public Page<Product> findByCategoriesIdOrderByCreatedAtDesc(Long categoryId, Pageable pageable) {
        return pRepository.findByCategoriesIdOrderByCreatedAtDesc(categoryId, pageable);
    }

}





































