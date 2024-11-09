package ie.tcd.scss.apapung.Domain;

import java.util.List;

public class PokemonStats {
    private String name;
    private List<String> types;
    private int dexNumber;
    private List<Stat> stats;
    private String spriteURL;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public List<String> getTypes() {
        return types;
    }
    public void setTypes(List<String> types) {
        this.types = types;
    }
    public int getDexNumber() {
        return dexNumber;
    }
    public void setDexNumber(int dexNumber) {
        this.dexNumber = dexNumber;
    }
    public List<Stat> getStats() {
        return stats;
    }
    public void setStats(List<Stat> stats) {
        this.stats = stats;
    }
    public String getSpriteURL() {
        return spriteURL;
    }
    public void setSpriteURL(String spriteURL) {
        this.spriteURL = spriteURL;
    }
}
