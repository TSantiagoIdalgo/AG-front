/* eslint-disable max-statements */
/* eslint-disable no-console */
/* eslint-disable no-inline-comments */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface Platform {
    name: string;
    platform: string;
    disabled: boolean
}

interface Files {
    mainImage: File;
    trailer: File;
    backgroundImage: File;
    images: FileList
}

interface Genre {
    name: string;
}

enum RequirementType {
    RECOMMENDED = "RECOMMENDED", MINIMUM = "MINIMUM"
}

interface Requirements {
    OS: string;
    memory: number;
    graphics: string;
    Directx_v: number;
    storage: number;
    processor: string;
    type: RequirementType
}

interface ProductForm {
    name: string;
    description: string;
    platforms: Platform[];
    developer: string;
    franchise: string;
    genres: Genre[];
    requirements: Requirements[]
    tags: string[];
    disabled: boolean;
    stock: number;
    price: number;
    discount: number;
}

 
export default function CreateProduct(): React.JSX.Element {
  const [currentTag, setCurrentTag] = useState<string>("");
  const [currentGenre, setCurrentGenre] = useState<string>("");
  const [currentRequirement, setCurrentRequirement] = useState<Requirements>({
    // eslint-disable-next-line camelcase
    Directx_v: 0,
    OS: "",
    graphics: "",
    memory: 0,
    processor: "",
    storage: 0,
    type: RequirementType.MINIMUM
  });
  const [currentPlatform, setCurrentPlatform] = useState<Platform>({
    disabled: false,
    name: "",
    platform: ""
  });
  const [currentFiles, setCurrentFiles] = useState<Files>();
  const [productForm, setProductForm] = useState<ProductForm>({
    description: "",
    developer: "",
    disabled: false,
    discount: 0,
    franchise: "",
    genres: [],
    name: "",
    platforms: [],
    price: 0,
    requirements: [],
    stock: 0,
    tags: []
  });
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    // Adjuntar el objeto productForm como JSON
    formData.append("product", new Blob([JSON.stringify(productForm)], { type: "application/json" }));

    // Adjuntar archivos únicos
    if (currentFiles?.mainImage) {
      formData.append("mainImage", currentFiles.mainImage);
    }
    if (currentFiles?.trailer) {
      formData.append("trailer", currentFiles.trailer);
    }
    if (currentFiles?.backgroundImage) {
      formData.append("backgroundImage", currentFiles.backgroundImage);
    }

    // Adjuntar lista de imágenes
    if (currentFiles?.images) {
      Object.values(currentFiles.images as FileList).forEach((image) => {
        formData.append("images", image); // Sin envolver en un Blob
      });
    }

    // Enviar el FormData al backend
    try {
      const response = await globalThis.fetch("http://localhost:8080/product/create", {
        body: formData,
        credentials: "include",
        method: "POST",
      });
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const setRequirement = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCurrentRequirement((prev) => ({ ...prev, [name]: Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10) }));
  };

  const setTag = () => {
    setProductForm((prev) => ({
      ...prev,
      tags: [...prev.tags, currentTag]
    }));
    setCurrentTag("");
  };

  const setGenres = () => {
    const genre: Genre = { name: currentGenre };
    setProductForm((prev) => ({
      ...prev,
      genres: [...prev.genres, genre]
    }));
  };

  const setPlatform = () => {
    setProductForm((prev) => ({
      ...prev,
      platforms: [...prev.platforms, currentPlatform]
    }));
  };

  const setNewRequirement = () => {
    setProductForm((prev) => ({
      ...prev,
      requirements: [...prev.requirements, currentRequirement]
    }));
  };
  
  return (
    <div>
      <form onSubmit={onSubmit} style={{display: "flex", flexDirection: "column", marginTop: "200px", width: "600px"}}>
        <div>
          <input name="name" value={productForm.name} onChange={handleChange} placeholder="Name" id="name"/>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <textarea name="description" value={productForm.description} onChange={handleChange} placeholder="Description" id="description"/>
          <label htmlFor="description">Description</label>
        </div>
        <div>
          <input name="developer" value={productForm.developer} onChange={handleChange} placeholder="developer" id="developer"/>
          <label htmlFor="developer">Developer</label>
        </div>
        <div>
          <input type="number" name="discount" value={productForm.discount} onChange={handleChange} placeholder="discount" id="discount"/>
          <label htmlFor="discount">discount</label>
        </div>
        <div>
          <input name="franchise" value={productForm.franchise} onChange={handleChange} placeholder="Franchise" id="franchise"/>
          <label htmlFor="franchise">franchise</label>
        </div>
        <div>
          <input type="number" name="price" value={productForm.price} onChange={handleChange} placeholder="Price" id="price"/>
          <label htmlFor="price">price</label>
        </div>
        <div>

          <input type="number" name="stock" value={productForm.stock} onChange={handleChange} placeholder="Stock" id="stock"/>
          <label htmlFor="stock">stock</label>
        </div>
        <div>
          <div>
            <input onChange={(event) => setCurrentTag(event.target.value)} id="tag"/>
            <label htmlFor="tag">Tags</label>
            <button type="button" onClick={setTag}>AÑADIR TAG</button>
          </div>
          {productForm.tags.map((tag, index) => <span style={{margin: "10px"}} key={index}>{tag}</span>)}
        </div>
        <div>
          <div>
            <input onChange={(event) => setCurrentGenre(event.target.value)} id="genre"/>
            <label htmlFor="genre">Genre</label>
            <button type="button" onClick={setGenres}>AÑADIR GENRE</button>
          </div>
          {productForm.genres.map((genre) => <span style={{margin: "10px"}} key={genre.name}>{genre.name}</span>)}
        </div>
        <div>
          <div style={{display: "flex", flexDirection: "column", gap: "10px", marginLeft: "50px"}}>
            <input onChange={(event) => setCurrentPlatform((prev) => ({ ...prev, name: event.target.value }))} id="platform_name"/>
            <label htmlFor="platform_name">platform_name</label>
            <input onChange={(event) => setCurrentPlatform((prev) => ({ ...prev, platform: event.target.value }))} id="platform_platform"/>
            <label htmlFor="platform_platform">platform_platform</label>
            <button type="button" onClick={setPlatform}>AÑADIR PLATFORM</button>
          </div>
          <div style={{display: "flex"}}>
            {productForm.platforms.map((platform) => <span style={{margin: "10px"}} key={platform.name}>{JSON.stringify(platform)}</span>)}
          </div>
        </div>
        <div>
          {Object.keys(currentRequirement).map(key => (
            <div key={key}>
              <input name={key} onChange={setRequirement} value={(currentRequirement as any)[key]} id={key}/>
              <label htmlFor={key}>{key}</label>
            </div>
          ))}
          <button type="button" onClick={setNewRequirement}>ADD REQUIREMENT</button>
          <div style={{display: "flex"}}>
            {productForm.requirements.map((requirements) => <span style={{margin: "10px"}} key={requirements.processor}>{JSON.stringify(requirements)}</span>)}
          </div>
        </div>
        <div>
          <div>
            <input type="file" id="bg" onChange={(event) => setCurrentFiles((prev: any) => ({ ...prev, backgroundImage: (event.target as any).files[0]}))}/>
            <label htmlFor="bg">BackgroundImage</label>
          </div>
          <div>
            <input type="file" id="trailer" onChange={(event) => setCurrentFiles((prev: any) => ({ ...prev, trailer: (event.target as any).files[0]}))}/>
            <label htmlFor="trailer">trailer</label>
          </div>
          <div>
            <input type="file" id="mainImage" onChange={(event) => setCurrentFiles((prev: any) => ({ ...prev, mainImage: (event.target as any).files[0]}))}/>
            <label htmlFor="mainImage">mainImage</label>
          </div>
          <div>
            <input type="file" id="images" multiple onChange={(event) => setCurrentFiles((prev: any) => ({ ...prev, images: [...(event.target as any).files]}))}/>
            <label htmlFor="images">images</label>
          </div>
        </div>
        <button type="submit">ENVIAR</button>
      </form>

      {JSON.stringify(productForm)}
    </div>
  );
}