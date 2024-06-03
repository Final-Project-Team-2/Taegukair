package org.taegukair.project.member.dto;

import java.util.Arrays;

public class PetDTO {
    private int petId;
    private int memberCode; // memberCode 필드 추가
    private String petName;
    private String species;
    private String breed;
    private byte[] image;

    public PetDTO() {
    }

    public PetDTO(int petId, int memberCode, String petName, String species, String breed, byte[] image) {
        this.petId = petId;
        this.memberCode = memberCode;
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

    public int getMemberCode() {
        return memberCode;
    }

    public void setMemberCode(int memberCode) {
        this.memberCode = memberCode;
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
                ", memberCode=" + memberCode +
                ", petName='" + petName + '\'' +
                ", species='" + species + '\'' +
                ", breed='" + breed + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
