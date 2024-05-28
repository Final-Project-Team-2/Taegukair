package org.taegukair.project.member.dto;

import java.util.Arrays;

public class PetDTO {
    private int petId;
    private String userId;
    private String petName;
    private String species;
    private String breed;
    private byte[] image;

    public PetDTO() {
    }

    public PetDTO(int petId, String userId, String petName, String species, String breed, byte[] image) {
        this.petId = petId;
        this.userId = userId;
        this.petName = petName;
        this.species = species;
        this.breed = breed;
        this.image = image;
    }

    public int getPetId() {
        return petId;
    }

    public void setPetId(int petId) {
        this.petId = petId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "PetDTO{" +
                "petId=" + petId +
                ", userId='" + userId + '\'' +
                ", petName='" + petName + '\'' +
                ", species='" + species + '\'' +
                ", breed='" + breed + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
