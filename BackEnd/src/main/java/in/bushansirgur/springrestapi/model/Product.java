package in.bushansirgur.springrestapi.model;


import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "tbl_product")
public class Product {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@NotNull(message = "codeEAN should not be null")
	private long codeEAN;

	@NotEmpty(message = "Name should not be null")
	private String name;

	@NotNull(message = "Price should not be null")
	private long price;

	@NotEmpty(message = "Description should not be null")
	@Size(min = 1, max = 500, message = "Description must be between 1 and 500 characters")
	private String description;

	@NotEmpty(message = "Brand should not be null")
	private String brand;

	@NotEmpty(message = "Units available should not be null")
	private String unitsAvailable;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	private Date createdAt;

	@NotNull(message = "Image Url should not be blank")
	private String imageUrl;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "product")
	private List<Comment> comments;
	

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category categories;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public long getCodeEAN() {
		return codeEAN;
	}


	public void setCodeEAN(long codeEAN) {
		this.codeEAN = codeEAN;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public long getPrice() {
		return price;
	}


	public void setPrice(long price) {
		this.price = price;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getBrand() {
		return brand;
	}


	public void setBrand(String brand) {
		this.brand = brand;
	}


	public String getUnitsAvailable() {
		return unitsAvailable;
	}


	public void setUnitsAvailable(String unitsAvailable) {
		this.unitsAvailable = unitsAvailable;
	}


	public Date getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public List<Comment> getComments() {
		return comments;
	}


	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}


	public Category getCategories() {
		return categories;
	}


	public void setCategories(Category categories) {
		this.categories = categories;
	}


	@Override
	public String toString() {
		return "Product [id=" + id + ", codeEAN=" + codeEAN + ", name=" + name + ", price=" + price + ", description="
				+ description + ", brand=" + brand + ", unitsAvailable=" + unitsAvailable + ", createdAt=" + createdAt
				+ ", imageUrl=" + imageUrl + ", comments=" + comments + ", categories=" + categories + "]";
	}
    
    
	
}
